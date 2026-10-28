'use client'

// The research application: six steps on one page. Answers autosave to this browser
// (localStorage) so a refresh or a closed tab doesn't lose them; they're cleared after submitting.
// Submissions go to the Worker in workers/research-apply, whose checks mirror the ones here.
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { researchApply } from '../../data/links'
import EmailLink from '../../components/EmailLink'
import type { Project } from '../../lib/research'
import ProjectFacts from '../_components/ProjectFacts'

export type ProjectOption = Omit<Project, 'draft' | 'open'>

const affiliations = ['UCI student', 'Student at another school', 'Not currently a student'] as const
const memberOptions = ['Yes', 'No', 'Not sure'] as const
const hourOptions = ['1–3', '3–6', '6–10', '10+'] as const
const formatOptions = ['In person', 'Online', 'Either'] as const

const answerLimit = 3000
const shortLimit = 200
const maxProjects = 20 // the Worker's limit
const storageKey = 'aisci-research-apply-v1'
const turnstileTimeoutMs = 10_000

const isOption = (options: readonly string[], value: string) => options.includes(value)

// End a message with punctuation so the sentence that follows it reads properly.
const asSentence = (text: string) => (/[.!?]$/.test(text.trim()) ? text.trim() : `${text.trim()}.`)

// Space-separated ids of a field's hint and error, for aria-describedby.
const describedBy = (id: string, hint?: unknown, error?: string) =>
  [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined

type Applicant = {
  name: string
  email: string
  age: string
  affiliation: string
  school: string
  yearOrRole: string
  member: string
  hours: string
  format: string
  basedIn: string
  experience: string
  links: string
  anythingElse: string
}

type Answer = { interest: string; explore: string; extra: string }

type Saved = { applicant: Applicant; selected: string[]; answers: Record<string, Answer>; step: number }

const emptyApplicant: Applicant = {
  name: '', email: '', age: '', affiliation: '', school: '', yearOrRole: '', member: '',
  hours: '', format: '', basedIn: '', experience: '', links: '', anythingElse: '',
}
const emptyAnswer: Answer = { interest: '', explore: '', extra: '' }

const steps = ['About you', 'Projects', 'Your interest', 'Experience', 'Rank', 'Review'] as const

type Errors = Record<string, string>

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: { sitekey: string; theme?: 'light' | 'dark' | 'auto'; callback: (token: string) => void; 'expired-callback'?: () => void; 'error-callback'?: () => void }) => string
      reset: (id?: string) => void
      remove: (id: string) => void
    }
  }
}

const inputClass =
  'mt-2 block w-full rounded-lg border border-brand-border bg-white px-3 py-2.5 text-brand placeholder:text-gray-400 focus:border-brand-accent'

function Field({ id, label, hint, error, optional, children }: { id: string; label: string; hint?: ReactNode; error?: string; optional?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block font-medium text-brand">
        {label}
        {optional && <span className="ml-2 text-sm font-normal text-gray-500">Optional</span>}
      </label>
      {hint && <p id={`${id}-hint`} className="mt-1 text-sm text-gray-500">{hint}</p>}
      {children}
      {error && <p id={`${id}-error`} className="mt-2 text-sm font-medium text-red-700">{error}</p>}
    </div>
  )
}

function Choice({ id, legend, options, value, onChange, error, hint }: { id: string; legend: string; options: readonly string[]; value: string; onChange: (value: string) => void; error?: string; hint?: string }) {
  return (
    <fieldset id={id} tabIndex={-1} aria-describedby={describedBy(id, hint, error)}>
      <legend className="font-medium text-brand">{legend}</legend>
      {hint && <p id={`${id}-hint`} className="mt-1 text-sm text-gray-500">{hint}</p>}
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className={`flex min-h-11 cursor-pointer items-center rounded-lg border px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-accent ${
              value === option ? 'border-brand bg-brand text-white' : 'border-brand-border bg-white text-brand hover:bg-brand-soft'
            }`}
          >
            <input type="radio" name={id} value={option} checked={value === option} onChange={() => onChange(option)} className="sr-only" />
            {option}
          </label>
        ))}
      </div>
      {error && <p id={`${id}-error`} className="mt-2 text-sm font-medium text-red-700">{error}</p>}
    </fieldset>
  )
}

function TextArea({ id, value, onChange, error, hint, rows = 5 }: { id: string; value: string; onChange: (value: string) => void; error?: string; hint?: boolean; rows?: number }) {
  return (
    <>
      <textarea
        id={id}
        rows={rows}
        maxLength={answerLimit}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${inputClass} leading-relaxed`}
      />
      <p className="mt-1 text-right text-xs text-gray-400" aria-hidden="true">{value.length} / {answerLimit}</p>
    </>
  )
}

export default function ApplyForm({ projects }: { projects: ProjectOption[] }) {
  const [applicant, setApplicant] = useState<Applicant>(emptyApplicant)
  const [selected, setSelected] = useState<string[]>([]) // also the ranking, best first
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Errors>({})
  const [restored, setRestored] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileFailed, setTurnstileFailed] = useState(false)
  const [panelSlug, setPanelSlug] = useState<string | null>(null)
  const [dragSlug, setDragSlug] = useState<string | null>(null)
  const [rankNotice, setRankNotice] = useState('') // read out by screen readers after a reorder

  const headingRef = useRef<HTMLHeadingElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const turnstileId = useRef<string | null>(null)
  const submitting = useRef(false) // blocks a second submit before the button re-renders as disabled
  const awaitingCheck = useRef(false) // the shown error is only "bot check not done yet"

  const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]))
  const chosen = selected.map((slug) => bySlug[slug]).filter(Boolean)
  const stepIds = steps.map((_, i) => i).filter((i) => !(i === 4 && chosen.length < 2))

  // Restore a saved draft (dropping projects that have since closed, and choices that are no
  // longer offered), then apply ?project=.
  useEffect(() => {
    let draft: Saved | undefined
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) draft = JSON.parse(raw)
    } catch {}
    const open = new Set(projects.map((p) => p.slug))
    let nextSelected = (draft?.selected ?? []).filter((slug) => open.has(slug))
    const fromLink = new URLSearchParams(window.location.search).get('project')
    const linkAdds = !!fromLink && open.has(fromLink) && !nextSelected.includes(fromLink)
    if (linkAdds) nextSelected = [...nextSelected, fromLink]
    if (draft) {
      const restored = { ...emptyApplicant, ...draft.applicant }
      if (!isOption(affiliations, restored.affiliation)) restored.affiliation = ''
      if (!isOption(memberOptions, restored.member)) restored.member = ''
      if (!isOption(hourOptions, restored.hours)) restored.hours = ''
      if (!isOption(formatOptions, restored.format)) restored.format = ''
      setApplicant(restored)
      setAnswers(draft.answers ?? {})
      // A project added from a link still needs its answers, so don't land past that step.
      const savedStep = Math.min(Math.max(draft.step ?? 0, 0), steps.length - 1)
      setStep(linkAdds ? Math.min(savedStep, 2) : savedStep)
    }
    setSelected(nextSelected)
    setRestored(true)
  }, [projects])

  useEffect(() => {
    if (!restored || status === 'done') return
    try {
      localStorage.setItem(storageKey, JSON.stringify({ applicant, selected, answers, step } satisfies Saved))
    } catch {}
  }, [restored, status, applicant, selected, answers, step])

  // Turnstile (bot check) renders on the review step, once a site key is configured. Ad and
  // tracker blockers sometimes stop it loading; then we say so rather than leave a blank space.
  useEffect(() => {
    if (step !== 5 || !researchApply.turnstileSiteKey) return
    let active = true
    const fail = () => { if (active) setTurnstileFailed(true) }
    const render = () => {
      const el = turnstileRef.current // the element on screen now, not one from an earlier visit
      if (!active || !el || !window.turnstile || turnstileId.current) return
      turnstileId.current = window.turnstile.render(el, {
        sitekey: researchApply.turnstileSiteKey,
        theme: 'light', // the site has no dark mode
        callback: (token) => {
          setTurnstileToken(token)
          setTurnstileFailed(false)
          if (awaitingCheck.current) {
            awaitingCheck.current = false
            setStatus('idle')
            setSubmitError('')
          }
        },
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': fail,
      })
    }
    let script = document.getElementById('turnstile-script') as HTMLScriptElement | null
    const failedToLoad = () => {
      script?.remove() // so coming back to this step tries again
      fail()
    }
    if (window.turnstile) render()
    else {
      if (!script) {
        script = document.createElement('script')
        script.id = 'turnstile-script'
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
        script.async = true
        document.head.appendChild(script)
      }
      script.addEventListener('load', render)
      script.addEventListener('error', failedToLoad)
    }
    const timer = window.setTimeout(() => { if (!turnstileId.current) fail() }, turnstileTimeoutMs)
    return () => {
      active = false
      window.clearTimeout(timer)
      script?.removeEventListener('load', render)
      script?.removeEventListener('error', failedToLoad)
      if (turnstileId.current) window.turnstile?.remove(turnstileId.current)
      turnstileId.current = null
      setTurnstileToken('')
      setTurnstileFailed(false)
    }
  }, [step])

  // Ranking needs two or more projects; skip past it if a restored draft lands there.
  useEffect(() => {
    if (step === 4 && chosen.length < 2) setStep(5)
  }, [step, chosen.length])

  const set = (field: keyof Applicant) => (value: string) => setApplicant((a) => ({ ...a, [field]: value }))
  const setAnswer = (slug: string, field: keyof Answer) => (value: string) =>
    setAnswers((all) => ({ ...all, [slug]: { ...emptyAnswer, ...all[slug], [field]: value } }))

  function toggle(slug: string) {
    setSelected((list) => (list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug]))
  }

  function move(slug: string, to: number) {
    const position = Math.max(0, Math.min(to, chosen.length - 1))
    setSelected((list) => {
      const next = list.filter((s) => s !== slug)
      next.splice(Math.max(0, Math.min(to, next.length)), 0, slug)
      return next
    })
    setRankNotice(`${bySlug[slug]?.title ?? slug} moved to number ${position + 1} of ${chosen.length}.`)
  }

  // Arrow buttons: keep focus on the moved project, switching to its other arrow at the ends
  // (where the pressed one becomes disabled and would otherwise drop focus).
  function moveBy(slug: string, from: number, delta: -1 | 1) {
    const to = from + delta
    move(slug, to)
    const last = chosen.length - 1
    const direction = to <= 0 ? 'down' : to >= last ? 'up' : delta < 0 ? 'up' : 'down'
    requestAnimationFrame(() => document.getElementById(`${slug}-move-${direction}`)?.focus())
  }

  function validate(i: number): Errors {
    const e: Errors = {}
    const a = applicant
    if (i === 0) {
      if (!a.name.trim()) e.name = 'Enter your name.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email.trim())) e.email = 'Enter an email address we can reach you at.'
      const age = Number(a.age)
      if (!Number.isInteger(age) || age < 13 || age > 120) e.age = 'Enter your age as a whole number between 13 and 120.'
      if (!isOption(affiliations, a.affiliation)) e.affiliation = "Choose where you are right now."
      if (a.affiliation === 'Student at another school' && !a.school.trim()) e.school = 'Which school?'
      if (!isOption(memberOptions, a.member)) e.member = "Say whether you're an AISCI member."
      if (!isOption(hourOptions, a.hours)) e.hours = "Choose how many hours per week you could put in."
      if (!isOption(formatOptions, a.format)) e.format = "Choose how you'd like to work."
    }
    if (i === 1 && chosen.length === 0) e.projects = 'Choose at least one project.'
    if (i === 1 && chosen.length > maxProjects) e.projects = `Choose at most ${maxProjects} projects.`
    if (i === 2) {
      for (const p of chosen) {
        const ans = answers[p.slug] ?? emptyAnswer
        if (!ans.interest.trim()) e[`${p.slug}-interest`] = 'Tell us what draws you to this project.'
        if (!ans.explore.trim()) e[`${p.slug}-explore`] = 'Tell us where you would start.'
      }
    }
    return e
  }

  const goTo = useCallback((i: number) => {
    setErrors({})
    setStatus((s) => (s === 'error' ? 'idle' : s)) // a failed send's message is stale once they move on
    setStep(i)
    requestAnimationFrame(() => {
      headingRef.current?.focus()
      headingRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    })
  }, [])

  function next() {
    const e = validate(step)
    if (Object.keys(e).length > 0) {
      setErrors(e)
      requestAnimationFrame(() => document.getElementById(Object.keys(e)[0])?.focus())
      return
    }
    const later = stepIds.find((i) => i > step)
    if (later !== undefined) goTo(later)
  }

  function back() {
    const earlier = [...stepIds].reverse().find((i) => i < step)
    if (earlier !== undefined) goTo(earlier)
  }

  async function submit() {
    if (submitting.current) return
    // Re-check every step: a restored draft may skip straight to review.
    for (const i of [0, 1, 2]) {
      if (Object.keys(validate(i)).length > 0) {
        goTo(i)
        setTimeout(() => setErrors(validate(i)), 0)
        return
      }
    }
    if (researchApply.turnstileSiteKey && !turnstileToken) {
      setStatus('error')
      setSubmitError(turnstileFailed ? "The bot check above didn't load." : 'Please complete the check above the submit button.')
      awaitingCheck.current = true
      return
    }
    const a = applicant
    const trimmed = (value: string) => value.trim() || undefined
    const payload = {
      turnstileToken,
      website: honeypot,
      applicant: {
        name: a.name.trim(),
        email: a.email.trim(),
        age: Number(a.age),
        affiliation: a.affiliation,
        // Only "another school" asks for one; ignore a school typed before switching answers.
        school: a.affiliation === 'UCI student' ? 'UC Irvine' : a.affiliation === 'Student at another school' ? trimmed(a.school) : undefined,
        yearOrRole: trimmed(a.yearOrRole),
        member: a.member,
        hours: a.hours,
        format: a.format,
        basedIn: trimmed(a.basedIn),
        experience: trimmed(a.experience),
        links: trimmed(a.links),
        anythingElse: trimmed(a.anythingElse),
      },
      applications: chosen.map((p, i) => {
        const ans = answers[p.slug] ?? emptyAnswer
        return { project: p.slug, rank: i + 1, interest: ans.interest.trim(), explore: ans.explore.trim(), extra: p.extraQuestion ? trimmed(ans.extra) : undefined }
      }),
    }

    submitting.current = true
    awaitingCheck.current = false
    setStatus('submitting')
    setSubmitError('')
    try {
      if (!researchApply.endpoint) {
        if (process.env.NODE_ENV !== 'development') throw new Error('Applications are not connected yet. Please check back soon.')
        console.info('[research apply] No endpoint set; this is what would be sent:', payload)
        await new Promise((resolve) => setTimeout(resolve, 600))
      } else {
        let response: Response
        try {
          response = await fetch(researchApply.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        } catch {
          // The browser's own text here ("Failed to fetch", "Load failed") means nothing to applicants.
          throw new Error("We couldn't reach our server. Check your internet connection.")
        }
        const result = await response.json().catch(() => ({}))
        if (!response.ok || !result.ok) throw new Error(result.error || 'Something went wrong saving your application.')
      }
      try {
        localStorage.removeItem(storageKey)
      } catch {}
      setStatus('done')
      requestAnimationFrame(() => headingRef.current?.focus())
    } catch (err) {
      setStatus('error')
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong saving your application.')
      if (turnstileId.current) window.turnstile?.reset(turnstileId.current)
      setTurnstileToken('')
    } finally {
      submitting.current = false
    }
  }

  function openPanel(slug: string) {
    setPanelSlug(slug)
    dialogRef.current?.showModal()
  }

  const panelProject = panelSlug ? bySlug[panelSlug] : undefined
  const errorList = Object.entries(errors)

  if (projects.length === 0) {
    return (
      <div className="mx-auto max-w-3xl surface-card p-8 text-center sm:p-10">
        <h2 className="text-2xl font-semibold text-brand">No projects are open right now</h2>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-gray-600">
          New projects open each quarter. Join the <Link href="/discord" className="font-medium text-brand underline underline-offset-4">Discord</Link> to hear when they do.
        </p>
      </div>
    )
  }

  if (status === 'done') {
    return (
      <div className="mx-auto max-w-3xl surface-card p-8 text-center sm:p-10">
        <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold text-brand focus:outline-none">Application received</h2>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-gray-600">
          Thanks, {applicant.name.trim().split(/\s+/)[0]}. We&apos;ll read every answer and email you at <span className="font-medium text-brand">{applicant.email.trim()}</span>{' '}once we&apos;ve reviewed applications.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/research" className="button-secondary">Back to projects</Link>
          <Link href="/discord" className="button-primary">Join our Discord</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress */}
      <ol className="flex gap-1.5" aria-label="Application steps">
        {stepIds.map((i) => (
          <li key={i} className="flex-1">
            <span className={`block h-1.5 rounded-full ${i <= step ? 'bg-brand' : 'bg-brand-border'}`} />
            <span className={`mt-2 hidden text-xs sm:block ${i === step ? 'font-semibold text-brand' : 'text-gray-500'}`} aria-current={i === step ? 'step' : undefined}>
              {steps[i]}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-6 surface-card p-5 sm:p-8">
        <p className="text-sm text-gray-500">Step {stepIds.indexOf(step) + 1} of {stepIds.length}</p>
        <h2 ref={headingRef} tabIndex={-1} className="mt-1 scroll-mt-28 text-2xl font-semibold text-brand focus:outline-none">
          {['About you', 'Which projects interest you?', 'Tell us about your interest', 'Experience', 'Rank your choices', 'Review and submit'][step]}
        </h2>

        {errorList.length > 0 && (
          <div role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <p className="font-semibold">Please fix {errorList.length === 1 ? 'this' : 'these'} before continuing:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {errorList.map(([id, message]) => {
                // Per-project answers share wording, so name the project in the summary.
                const project = chosen.find((p) => id === `${p.slug}-interest` || id === `${p.slug}-explore`)
                return (
                  <li key={id}><a href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.focus() }} className="underline underline-offset-2">{project ? `${project.title} — ${message}` : message}</a></li>
                )
              })}
            </ul>
          </div>
        )}

        <div className="mt-6 space-y-7">
          {step === 0 && (
            <>
              <p className="leading-relaxed text-gray-600">Anyone can apply. Members of AISCI get priority, but you don&apos;t need to be one, or be at UCI.</p>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="name" label="Full name" error={errors.name}>
                  <input id="name" autoComplete="name" maxLength={shortLimit} value={applicant.name} onChange={(e) => set('name')(e.target.value)} aria-invalid={errors.name ? true : undefined} aria-describedby={describedBy('name', undefined, errors.name)} className={inputClass} />
                </Field>
                <Field id="email" label="Email" error={errors.email}>
                  <input id="email" type="email" autoComplete="email" maxLength={shortLimit} value={applicant.email} onChange={(e) => set('email')(e.target.value)} aria-invalid={errors.email ? true : undefined} aria-describedby={describedBy('email', undefined, errors.email)} className={inputClass} />
                </Field>
                <Field id="age" label="Age" error={errors.age}>
                  <input id="age" type="number" inputMode="numeric" min={13} max={120} value={applicant.age} onChange={(e) => set('age')(e.target.value)} aria-invalid={errors.age ? true : undefined} aria-describedby={describedBy('age', undefined, errors.age)} className={`${inputClass} sm:max-w-32`} />
                </Field>
              </div>
              <Choice id="affiliation" legend="Where are you right now?" options={affiliations} value={applicant.affiliation} onChange={set('affiliation')} error={errors.affiliation} />
              {applicant.affiliation === 'Student at another school' && (
                <Field id="school" label="School" error={errors.school}>
                  <input id="school" maxLength={shortLimit} value={applicant.school} onChange={(e) => set('school')(e.target.value)} aria-invalid={errors.school ? true : undefined} aria-describedby={describedBy('school', undefined, errors.school)} className={inputClass} />
                </Field>
              )}
              {applicant.affiliation && (
                <Field id="yearOrRole" label={applicant.affiliation === 'Not currently a student' ? 'What do you do?' : 'Year and major'} optional>
                  <input id="yearOrRole" maxLength={shortLimit} value={applicant.yearOrRole} onChange={(e) => set('yearOrRole')(e.target.value)} placeholder={applicant.affiliation === 'Not currently a student' ? 'e.g. Software engineer' : 'e.g. 2nd year, Computer Science'} className={inputClass} />
                </Field>
              )}
              <Choice id="member" legend="Are you an AISCI member?" options={memberOptions} value={applicant.member} onChange={set('member')} error={errors.member} />
              <Choice id="hours" legend="Hours per week you could put in" options={hourOptions} value={applicant.hours} onChange={set('hours')} error={errors.hours} />
              <Choice id="format" legend="How would you like to work?" options={formatOptions} value={applicant.format} onChange={set('format')} error={errors.format} hint="In person means at UC Irvine." />
              <Field id="basedIn" label="Where are you based?" hint="City or time zone, so we can schedule meetings." optional>
                <input id="basedIn" maxLength={shortLimit} value={applicant.basedIn} onChange={(e) => set('basedIn')(e.target.value)} aria-describedby={describedBy('basedIn', true)} className={inputClass} />
              </Field>
            </>
          )}

          {step === 1 && (
            <>
              <p className="leading-relaxed text-gray-600">Choose as many as you like. You&apos;ll answer two short questions for each, and can read each one-pager without leaving this page.</p>
              <ul id="projects" tabIndex={-1} className="space-y-4">
                {projects.map((p) => {
                  const isOn = selected.includes(p.slug)
                  return (
                    <li key={p.slug} className={`rounded-2xl border p-5 transition-colors ${isOn ? 'border-brand bg-brand-soft/60' : 'border-brand-border bg-white'}`}>
                      <label className="flex cursor-pointer items-start gap-4">
                        <input type="checkbox" checked={isOn} onChange={() => toggle(p.slug)} aria-labelledby={`${p.slug}-option`} aria-describedby={`${p.slug}-option-summary`} className="mt-1 h-5 w-5 shrink-0 rounded border-brand-border accent-brand" />
                        <span className="min-w-0">
                          <span id={`${p.slug}-option`} className="block text-lg font-semibold leading-snug text-brand">{p.title}</span>
                          <span id={`${p.slug}-option-summary`} className="mt-1 block leading-relaxed text-gray-600">{p.summary}</span>
                        </span>
                      </label>
                      <div className="mt-4 pl-9">
                        <ProjectFacts project={p} compact />
                        {p.constraints.length > 0 && (
                          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-600">
                            {p.constraints.map((c) => <li key={c}>{c}</li>)}
                          </ul>
                        )}
                        <button type="button" onClick={() => openPanel(p.slug)} className="mt-3 inline-flex min-h-10 items-center text-sm font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">
                          Read the one-pager
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
              {errors.projects && <p className="text-sm font-medium text-red-700">{errors.projects}</p>}
            </>
          )}

          {step === 2 && (
            <>
              <div className="rounded-xl bg-brand-soft p-4 text-sm leading-relaxed text-brand">
                This is the most important part of your application. There are no right answers. We want to see what genuinely interests you and how you think, not what you already know.
              </div>
              {chosen.map((p) => {
                const ans = answers[p.slug] ?? emptyAnswer
                return (
                  <section key={p.slug} aria-labelledby={`${p.slug}-title`} className="border-t border-brand-border pt-6 first:border-t-0 first:pt-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 id={`${p.slug}-title`} className="text-lg font-semibold text-brand">{p.title}</h3>
                      <button type="button" onClick={() => openPanel(p.slug)} className="inline-flex min-h-10 items-center text-sm font-semibold text-brand-accent underline decoration-brand/30 underline-offset-4 hover:text-brand">
                        Read the one-pager
                      </button>
                    </div>
                    <div className="mt-4 space-y-5">
                      <Field id={`${p.slug}-interest`} label="What about this project interests you, and why?" error={errors[`${p.slug}-interest`]}>
                        <TextArea id={`${p.slug}-interest`} value={ans.interest} onChange={setAnswer(p.slug, 'interest')} error={errors[`${p.slug}-interest`]} />
                      </Field>
                      <Field id={`${p.slug}-explore`} label="What's the first thing you'd want to explore?" error={errors[`${p.slug}-explore`]}>
                        <TextArea id={`${p.slug}-explore`} value={ans.explore} onChange={setAnswer(p.slug, 'explore')} error={errors[`${p.slug}-explore`]} />
                      </Field>
                      {p.extraQuestion && (
                        <Field id={`${p.slug}-extra`} label={p.extraQuestion} optional>
                          <TextArea id={`${p.slug}-extra`} value={ans.extra} onChange={setAnswer(p.slug, 'extra')} rows={3} />
                        </Field>
                      )}
                    </div>
                  </section>
                )
              })}
            </>
          )}

          {step === 3 && (
            <>
              <div className="rounded-xl bg-brand-soft p-4 text-sm leading-relaxed text-brand">
                <p className="font-semibold">This whole step is optional.</p>
                <p className="mt-1">Experience can help your application, but it isn&apos;t what we&apos;re selecting for. Having none is no disadvantage if your project answers show real interest and thought.</p>
              </div>
              <Field id="experience" label="Anything relevant you've done" hint="Courses, projects, reading, jobs, anything. A few sentences is plenty." optional>
                <TextArea id="experience" value={applicant.experience} onChange={set('experience')} hint />
              </Field>
              <Field id="links" label="Links" hint="GitHub, a personal site, LinkedIn, or a resume link." optional>
                <TextArea id="links" value={applicant.links} onChange={set('links')} hint rows={2} />
              </Field>
            </>
          )}

          {step === 4 && (
            <>
              <p className="leading-relaxed text-gray-600">Put the project you&apos;d most like to join first. Drag to reorder, or use the arrows.</p>
              <ol className="space-y-2">
                {chosen.map((p, i) => (
                  <li
                    key={p.slug}
                    draggable
                    onDragStart={() => setDragSlug(p.slug)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => { if (dragSlug) move(dragSlug, i); setDragSlug(null) }}
                    onDragEnd={() => setDragSlug(null)}
                    className={`flex items-center gap-3 rounded-xl border bg-white p-3 sm:p-4 ${dragSlug === p.slug ? 'border-brand-accent opacity-60' : 'border-brand-border'} cursor-grab active:cursor-grabbing`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">{i + 1}</span>
                    <span className="min-w-0 flex-1 font-medium text-brand">{p.title}</span>
                    <span className="flex shrink-0 gap-1">
                      <button type="button" id={`${p.slug}-move-up`} onClick={() => moveBy(p.slug, i, -1)} disabled={i === 0} aria-label={`Move ${p.title} up`} className="hero-photo-control disabled:opacity-30">↑</button>
                      <button type="button" id={`${p.slug}-move-down`} onClick={() => moveBy(p.slug, i, 1)} disabled={i === chosen.length - 1} aria-label={`Move ${p.title} down`} className="hero-photo-control disabled:opacity-30">↓</button>
                    </span>
                  </li>
                ))}
              </ol>
              <p aria-live="polite" className="sr-only">{rankNotice}</p>
            </>
          )}

          {step === 5 && (
            <>
              <Field id="anythingElse" label="Anything else you'd like us to know?" optional>
                <TextArea id="anythingElse" value={applicant.anythingElse} onChange={set('anythingElse')} rows={3} />
              </Field>

              <ReviewSection title="About you" onEdit={() => goTo(0)}>
                <Row label="Name" value={applicant.name} />
                <Row label="Email" value={applicant.email} />
                <Row label="Age" value={applicant.age} />
                <Row label="Affiliation" value={[applicant.affiliation, applicant.affiliation === 'Student at another school' ? applicant.school : ''].filter(Boolean).join(', ')} />
                <Row label={applicant.affiliation === 'Not currently a student' ? 'What you do' : 'Year and major'} value={applicant.yearOrRole} />
                <Row label="AISCI member" value={applicant.member} />
                <Row label="Hours per week" value={applicant.hours} />
                <Row label="Format" value={applicant.format} />
                <Row label="Based in" value={applicant.basedIn} />
              </ReviewSection>

              <ReviewSection title={chosen.length > 1 ? 'Projects, in your order' : 'Project'} onEdit={() => goTo(1)}>
                {chosen.map((p, i) => {
                  const ans = answers[p.slug] ?? emptyAnswer
                  return (
                    <div key={p.slug} className="py-3">
                      <p className="font-semibold text-brand">{chosen.length > 1 && `${i + 1}. `}{p.title}</p>
                      <p className="mt-2 text-sm text-gray-500">What interests you</p>
                      <p className="whitespace-pre-wrap text-sm text-gray-700 [overflow-wrap:anywhere]">{ans.interest}</p>
                      <p className="mt-2 text-sm text-gray-500">First thing to explore</p>
                      <p className="whitespace-pre-wrap text-sm text-gray-700 [overflow-wrap:anywhere]">{ans.explore}</p>
                      {p.extraQuestion && ans.extra.trim() && (
                        <>
                          <p className="mt-2 text-sm text-gray-500">{p.extraQuestion}</p>
                          <p className="whitespace-pre-wrap text-sm text-gray-700 [overflow-wrap:anywhere]">{ans.extra}</p>
                        </>
                      )}
                    </div>
                  )
                })}
              </ReviewSection>

              <ReviewSection title="Experience" onEdit={() => goTo(3)}>
                <Row label="Experience" value={applicant.experience} />
                <Row label="Links" value={applicant.links} />
              </ReviewSection>

              {/* Hidden from people; bots that fill every field get dropped by the Worker. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </div>

              <p className="text-sm leading-relaxed text-gray-500">
                Your answers go only to AISCI organizers, who use them to review applications and contact you about research projects.
              </p>
              {researchApply.turnstileSiteKey && <div ref={turnstileRef} />}
              {turnstileFailed && !turnstileToken && (
                <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-800">
                  <p className="font-semibold">The bot check didn&apos;t load.</p>
                  <p className="mt-1">
                    An ad or tracker blocker is the usual cause. Pause it for this page (or allow challenges.cloudflare.com), or try another browser, then reload. Your answers are saved in this browser. If it still won&apos;t load, email us at <EmailLink className="break-words font-medium underline underline-offset-2" />.
                  </p>
                </div>
              )}
              {status === 'error' && (
                <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  <p className="font-semibold">Your application wasn&apos;t sent.</p>
                  <p className="mt-1">{asSentence(submitError)} Your answers are still saved here, so you can try again.</p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-brand-border pt-6">
          {step !== stepIds[0] ? (
            <button type="button" onClick={back} className="button-secondary">
              <span aria-hidden="true">←</span> Back
            </button>
          ) : <span />}
          {step === 5 ? (
            <button type="button" onClick={submit} disabled={status === 'submitting'} className="button-primary disabled:opacity-60">
              {status === 'submitting' ? 'Sending…' : 'Submit application'}
            </button>
          ) : (
            <button type="button" onClick={next} className="button-primary">
              Continue <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </div>

      {/* One-pager side panel */}
      <dialog
        ref={dialogRef}
        aria-labelledby="panel-title"
        onClose={() => setPanelSlug(null)}
        onClick={(e) => { if (e.target === dialogRef.current) dialogRef.current?.close() }}
        className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-2xl bg-white p-0 shadow-card-hover backdrop:bg-brand/40"
      >
        {panelProject && (
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-4 border-b border-brand-border p-5 sm:px-8">
              <h2 id="panel-title" className="text-xl font-semibold leading-snug text-brand">{panelProject.title}</h2>
              <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close the one-pager" className="hero-photo-control shrink-0 text-xl">×</button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 sm:px-8">
              <ProjectFacts project={panelProject} compact />
              <div className="prose prose-brand mt-6 max-w-none break-words prose-a:underline-offset-4 prose-a:decoration-brand/30" dangerouslySetInnerHTML={{ __html: panelProject.html }} />
              {panelProject.onePagerUrl && (
                <p className="mt-6 text-sm">
                  <a href={panelProject.onePagerUrl} target="_blank" rel="noopener noreferrer" aria-label={`Full one-pager for ${panelProject.title} (opens in a new tab)`} className="font-medium text-brand underline underline-offset-4">Full one-pager ↗</a>
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-3 border-t border-brand-border p-5 sm:px-8">
              {step === 1 && (
                <button type="button" onClick={() => { toggle(panelProject.slug); dialogRef.current?.close() }} className="button-primary">
                  {selected.includes(panelProject.slug) ? 'Remove from my choices' : 'Add to my choices'}
                </button>
              )}
              <button type="button" onClick={() => dialogRef.current?.close()} className="button-secondary">Back to the form</button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  )
}

function ReviewSection({ title, onEdit, children }: { title: string; onEdit: () => void; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-brand-border p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-semibold text-brand">{title}</h3>
        <button type="button" onClick={onEdit} className="inline-flex min-h-10 items-center text-sm font-semibold text-brand-accent underline underline-offset-4 hover:text-brand">Edit</button>
      </div>
      <div className="mt-2 divide-y divide-brand-border">{children}</div>
    </section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value.trim()) return null
  return (
    <div className="grid gap-1 py-2 text-sm sm:grid-cols-3">
      <span className="text-gray-500">{label}</span>
      <span className="whitespace-pre-wrap text-gray-700 [overflow-wrap:anywhere] sm:col-span-2">{value}</span>
    </div>
  )
}
