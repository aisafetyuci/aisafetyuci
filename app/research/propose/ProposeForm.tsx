'use client'

// Pitch a project of your own: one page, same fields and styles as the application form, sent
// to the same Worker (workers/research-apply) as a `kind: 'proposal'` submission. Answers
// autosave to this browser and are cleared after sending.
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { researchApply } from '../../data/links'
import EmailLink from '../../components/EmailLink'
import { Choice, Field, TextArea, affiliations, countWords, describedBy, formatOptions, hourOptions, inputClass, memberOptions, shortLimit, toneNote } from '../apply/ApplyForm'

const needOptions = ['Compute or API credits', 'A mentor', 'Teammates', 'Help scoping the question', 'Something else'] as const
const teamOptions = ['Just me, with a mentor', 'Open to 1–2 teammates', "I'd like a full team"] as const
const storageKey = 'aisci-research-propose-v1'
const turnstileTimeoutMs = 10_000

type Form = {
  name: string; email: string; age: string; affiliation: string; school: string; member: string; hours: string; format: string
  question: string; why: string; prior: string; plan: string; needs: string[]; compute: string; team: string; done: string; anythingElse: string
}
const empty: Form = {
  name: '', email: '', age: '', affiliation: '', school: '', member: '', hours: '', format: '',
  question: '', why: '', prior: '', plan: '', needs: [], compute: '', team: '', done: '', anythingElse: '',
}
type TextKey = Exclude<keyof Form, 'needs'>

// Word limits for the long answers; the order here is the order on the page.
const ideaQuestions: { key: TextKey; label: string; hint?: string; words: number; optional?: boolean; rows?: number }[] = [
  { key: 'question', label: 'Your question, in one or two sentences', words: 50, rows: 2 },
  { key: 'why', label: 'Why does it matter for AI safety?', hint: 'What changes if the answer is yes, and what if it’s no?', words: 75, rows: 3 },
  { key: 'prior', label: 'What’s already been done?', hint: 'Papers, posts or results you found, with links. “I couldn’t find anything” is a fine answer if you say where you looked.', words: 75, rows: 3 },
  { key: 'plan', label: 'What would you do in 3 weeks, and what result would count as an answer?', words: 100, rows: 4 },
]

// window.turnstile is typed in ../apply/ApplyForm.tsx.

export default function ProposeForm() {
  const [form, setForm] = useState<Form>(empty)
  const [restored, setRestored] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [token, setToken] = useState('')
  const [turnstileProblem, setTurnstileProblem] = useState(false)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const turnstileId = useRef<string | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const submitErrorRef = useRef<HTMLDivElement>(null)
  const submitting = useRef(false)

  // Restore a saved draft, keeping only fields and choices this version of the form knows.
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? 'null')
      if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
        const s = saved as Record<string, unknown>
        const next = { ...empty }
        for (const key of Object.keys(empty) as (keyof Form)[]) {
          if (key === 'needs') next.needs = Array.isArray(s.needs) ? s.needs.filter((n): n is string => (needOptions as readonly string[]).includes(n as string)) : []
          else if (typeof s[key] === 'string') next[key] = s[key] as string
        }
        if (!(affiliations as readonly string[]).includes(next.affiliation)) next.affiliation = ''
        if (!(memberOptions as readonly string[]).includes(next.member)) next.member = ''
        if (!(hourOptions as readonly string[]).includes(next.hours)) next.hours = ''
        if (!(formatOptions as readonly string[]).includes(next.format)) next.format = ''
        if (!(teamOptions as readonly string[]).includes(next.team)) next.team = ''
        setForm(next)
      }
    } catch {}
    setRestored(true)
  }, [])

  useEffect(() => {
    if (!restored || status === 'done') return
    try {
      localStorage.setItem(storageKey, JSON.stringify(form))
    } catch {}
  }, [restored, status, form])

  // Turnstile (bot check), as on the application form; a blocker can stop it loading.
  useEffect(() => {
    if (!researchApply.turnstileSiteKey || status === 'done') return
    let active = true
    const render = () => {
      const el = turnstileRef.current
      if (!active || !el || !window.turnstile || turnstileId.current) return
      setTurnstileProblem(false)
      turnstileId.current = window.turnstile.render(el, {
        sitekey: researchApply.turnstileSiteKey,
        theme: 'light',
        callback: (t) => { setToken(t); setTurnstileProblem(false) },
        'expired-callback': () => setToken(''),
        'error-callback': () => { if (active) setTurnstileProblem(true) },
      })
    }
    let script = document.getElementById('turnstile-script') as HTMLScriptElement | null
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
    }
    const timer = window.setTimeout(() => { if (active && !turnstileId.current) setTurnstileProblem(true) }, turnstileTimeoutMs)
    return () => {
      active = false
      window.clearTimeout(timer)
      script?.removeEventListener('load', render)
      if (turnstileId.current) window.turnstile?.remove(turnstileId.current)
      turnstileId.current = null
    }
  }, [status === 'done']) // eslint-disable-line react-hooks/exhaustive-deps

  const set = (key: TextKey) => (value: string) => setForm((f) => ({ ...f, [key]: value }))
  const toggleNeed = (need: string) => setForm((f) => ({ ...f, needs: f.needs.includes(need) ? f.needs.filter((n) => n !== need) : [...f.needs, need] }))

  function validate() {
    const e: Record<string, string> = {}
    const f = form
    if (!f.name.trim()) e.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Enter an email address we can reach you at.'
    const age = Number(f.age)
    if (!Number.isInteger(age) || age < 13 || age > 120) e.age = 'Enter your age as a whole number between 13 and 120.'
    if (!(affiliations as readonly string[]).includes(f.affiliation)) e.affiliation = 'Choose where you are right now.'
    if (f.affiliation === 'Student at another school' && !f.school.trim()) e.school = 'Which school?'
    if (!(memberOptions as readonly string[]).includes(f.member)) e.member = "Say whether you're an AISCI member."
    if (!(hourOptions as readonly string[]).includes(f.hours)) e.hours = 'Choose how many hours per week you could put in.'
    if (!(formatOptions as readonly string[]).includes(f.format)) e.format = "Choose how you'd like to work."
    for (const q of ideaQuestions) {
      if (!f[q.key].trim()) e[q.key] = 'Please answer this one.'
      else if (countWords(f[q.key]) > q.words) e[q.key] = `Keep this to ${q.words} words or fewer.`
    }
    if (f.needs.length === 0) e.needs = 'Choose at least one thing you need from us.'
    if (!(teamOptions as readonly string[]).includes(f.team)) e.team = 'Say whether you want teammates.'
    if (countWords(f.done) > 75) e.done = 'Keep this to 75 words or fewer.'
    return e
  }

  async function submit() {
    if (submitting.current) return
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) {
      requestAnimationFrame(() => document.getElementById('form-errors')?.focus())
      return
    }
    if (researchApply.turnstileSiteKey && !token) {
      setStatus('error')
      setSubmitError(turnstileProblem
        ? 'The bot check didn’t load. An ad or tracker blocker is the usual cause: pause it for this page or try another browser, then reload. Your answers are saved in this browser.'
        : 'Please complete the check above the submit button.')
      requestAnimationFrame(() => submitErrorRef.current?.focus())
      return
    }
    const f = form
    const trimmed = (value: string) => value.trim() || undefined
    const payload = {
      kind: 'proposal',
      turnstileToken: token,
      website: honeypot,
      applicant: {
        name: f.name.trim(),
        email: f.email.trim(),
        age: Number(f.age),
        affiliation: f.affiliation,
        school: f.affiliation === 'UCI student' ? 'UC Irvine' : f.affiliation === 'Student at another school' ? trimmed(f.school) : undefined,
        member: f.member,
        hours: f.hours,
        format: f.format,
        anythingElse: trimmed(f.anythingElse),
      },
      proposal: {
        question: f.question.trim(),
        why: f.why.trim(),
        prior: f.prior.trim(),
        plan: f.plan.trim(),
        needs: needOptions.filter((n) => f.needs.includes(n)),
        compute: trimmed(f.compute),
        team: f.team,
        done: trimmed(f.done),
      },
    }

    submitting.current = true
    setStatus('submitting')
    setSubmitError('')
    try {
      if (!researchApply.endpoint) {
        if (process.env.NODE_ENV !== 'development') throw new Error('Proposals are not connected yet. Please check back soon.')
        console.info('[research propose] No endpoint set; this is what would be sent:', payload)
        await new Promise((resolve) => setTimeout(resolve, 600))
      } else {
        let response: Response
        try {
          response = await fetch(researchApply.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        } catch {
          throw new Error("We couldn't reach our server. Check your internet connection.")
        }
        const result = await response.json().catch(() => ({}))
        if (!response.ok || !result.ok) throw new Error(result.error || 'Something went wrong sending your idea.')
      }
      try {
        localStorage.removeItem(storageKey)
      } catch {}
      setStatus('done')
      requestAnimationFrame(() => headingRef.current?.focus())
    } catch (err) {
      setStatus('error')
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong sending your idea.')
      if (turnstileId.current) window.turnstile?.reset(turnstileId.current)
      setToken('')
      requestAnimationFrame(() => submitErrorRef.current?.focus())
    } finally {
      submitting.current = false
    }
  }

  if (status === 'done') {
    return (
      <div className="mx-auto max-w-3xl surface-card p-8 text-center sm:p-10">
        <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold text-brand focus:outline-none">Idea received</h2>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-gray-600">
          Thanks, {form.name.trim().split(/\s+/)[0]}. We&apos;ll read it closely and email you at <span className="font-medium text-brand">{form.email.trim()}</span>, usually within a couple of weeks.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/research" className="button-secondary">Back to projects</Link>
          <Link href="/discord" className="button-primary">Join our Discord</Link>
        </div>
      </div>
    )
  }

  const errorList = Object.entries(errors)

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {errorList.length > 0 && (
        <div id="form-errors" tabIndex={-1} role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 focus:outline-none">
          <p className="font-semibold">Please fix {errorList.length === 1 ? 'this' : 'these'} before sending:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errorList.map(([id, message]) => (
              <li key={id}><a href={`#${id}`} onClick={(ev) => { ev.preventDefault(); document.getElementById(id)?.focus() }} className="underline underline-offset-2">{ideaQuestions.find((q) => q.key === id)?.label.concat(' — ') ?? ''}{message}</a></li>
            ))}
          </ul>
        </div>
      )}

      <section aria-labelledby="idea-heading" className="surface-card space-y-7 p-5 sm:p-8">
        <div>
          <h2 id="idea-heading" className="text-2xl font-semibold text-brand">Your idea</h2>
          <p className="mt-3 rounded-xl bg-brand-soft p-4 text-sm leading-relaxed text-brand">
            We&apos;re looking for a real open question that fits a few weeks, not a finished proposal. We&apos;ll help you scope it. {toneNote}
          </p>
        </div>
        {ideaQuestions.map((q) => (
          <Field key={q.key} id={q.key} label={q.label} hint={q.hint} error={errors[q.key]}>
            <TextArea id={q.key} value={form[q.key]} onChange={set(q.key)} error={errors[q.key]} hint={!!q.hint} rows={q.rows} wordLimit={q.words} />
          </Field>
        ))}
        <fieldset id="needs" tabIndex={-1} aria-describedby={describedBy('needs', true, errors.needs)}>
          <legend className="font-medium text-brand">What would you need from us?</legend>
          <p id="needs-hint" className="mt-1 text-sm text-gray-500">Choose all that apply.</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {needOptions.map((need) => {
              const on = form.needs.includes(need)
              return (
                <label key={need} className={`flex min-h-11 cursor-pointer items-center rounded-lg border px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-accent ${on ? 'border-brand bg-brand text-white' : 'border-brand-border bg-white text-brand hover:bg-brand-soft'}`}>
                  <input type="checkbox" checked={on} onChange={() => toggleNeed(need)} className="sr-only" />
                  {need}
                </label>
              )
            })}
          </div>
          {errors.needs && <p id="needs-error" className="mt-2 text-sm font-medium text-red-700">{errors.needs}</p>}
        </fieldset>
        {form.needs.includes('Compute or API credits') && (
          <Field id="compute" label="Rough compute estimate" hint="e.g. “about $50 of API credits” or “a few hours on one A100”. A guess is fine." optional>
            <input id="compute" maxLength={shortLimit} value={form.compute} onChange={(e) => set('compute')(e.target.value)} aria-describedby={describedBy('compute', true)} className={inputClass} />
          </Field>
        )}
        <Choice id="team" legend="Would you like others to join you?" options={teamOptions} value={form.team} onChange={set('team')} error={errors.team} hint="Your call. If you want others, we may open it to members as a project, with you on it." />
        <Field id="done" label="Anything you've already done on it, or how you came up with it?" hint="Code, notes, a quick experiment, links. “Nothing yet” is fine." error={errors.done} optional>
          <TextArea id="done" value={form.done} onChange={set('done')} error={errors.done} hint rows={3} wordLimit={75} />
        </Field>
      </section>

      <section aria-labelledby="you-heading" className="surface-card space-y-7 p-5 sm:p-8">
        <h2 id="you-heading" className="text-2xl font-semibold text-brand">About you</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="name" label="Full name" error={errors.name}>
            <input id="name" autoComplete="name" maxLength={shortLimit} value={form.name} onChange={(e) => set('name')(e.target.value)} aria-invalid={errors.name ? true : undefined} aria-describedby={describedBy('name', undefined, errors.name)} className={inputClass} />
          </Field>
          <Field id="email" label="Email" error={errors.email}>
            <input id="email" type="email" autoComplete="email" maxLength={shortLimit} value={form.email} onChange={(e) => set('email')(e.target.value)} aria-invalid={errors.email ? true : undefined} aria-describedby={describedBy('email', undefined, errors.email)} className={inputClass} />
          </Field>
          <Field id="age" label="Age" error={errors.age}>
            <input id="age" type="number" inputMode="numeric" min={13} max={120} value={form.age} onChange={(e) => set('age')(e.target.value)} aria-invalid={errors.age ? true : undefined} aria-describedby={describedBy('age', undefined, errors.age)} className={`${inputClass} sm:max-w-32`} />
          </Field>
        </div>
        <Choice id="affiliation" legend="Where are you right now?" options={affiliations} value={form.affiliation} onChange={set('affiliation')} error={errors.affiliation} />
        {form.affiliation === 'Student at another school' && (
          <Field id="school" label="School" error={errors.school}>
            <input id="school" maxLength={shortLimit} value={form.school} onChange={(e) => set('school')(e.target.value)} aria-invalid={errors.school ? true : undefined} aria-describedby={describedBy('school', undefined, errors.school)} className={inputClass} />
          </Field>
        )}
        <Choice id="member" legend="Are you an AISCI member?" options={memberOptions} value={form.member} onChange={set('member')} error={errors.member} />
        <Choice id="hours" legend="Hours per week you could put in" options={hourOptions} value={form.hours} onChange={set('hours')} error={errors.hours} />
        <Choice id="format" legend="How would you like to work?" options={formatOptions} value={form.format} onChange={set('format')} error={errors.format} hint="In person means at UC Irvine." />
        <Field id="anythingElse" label="Anything else you'd like us to know?" optional>
          <TextArea id="anythingElse" value={form.anythingElse} onChange={set('anythingElse')} rows={3} placeholder="e.g. how big a team you'd want, whether others can join, or what kind of mentor would help" />
        </Field>
      </section>

      <section className="surface-card space-y-5 p-5 sm:p-8">
        {/* Hidden from people; the Worker logs it when filled (bots, or browser autofill). */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>
        <p className="text-sm leading-relaxed text-gray-500">
          Your answers go only to AISCI organizers, who use them to review ideas and contact you about research projects.
        </p>
        {researchApply.turnstileSiteKey && <div ref={turnstileRef} />}
        {status === 'error' && (
          <div ref={submitErrorRef} tabIndex={-1} role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 focus:outline-none">
            <p className="font-semibold">Your idea wasn&apos;t sent.</p>
            <p className="mt-1">{submitError} If it keeps happening, email us at <EmailLink className="break-words font-medium underline underline-offset-2" />.</p>
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-brand-border pt-6">
          <Link href="/research" className="button-secondary"><span aria-hidden="true">←</span> Back to projects</Link>
          <button type="button" onClick={submit} disabled={status === 'submitting'} className="button-primary disabled:opacity-60">
            {status === 'submitting' ? 'Sending…' : 'Send my idea'}
          </button>
        </div>
      </section>
    </div>
  )
}
