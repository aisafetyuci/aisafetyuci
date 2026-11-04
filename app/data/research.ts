// Research project applications: the deadline, set once here. It's shown in the homepage banner and
// card, the Get Involved section, the /research header and each open project's apply box.
// NOTE: docs/discord-info-channel.md restates the deadline — update it manually.
import { formatMonthDay } from './events'

// The last day to apply: the site shows it ("Nov 10") and counts it as passed after that day ends, Pacific.
// Set to null when the next round has no fixed deadline yet: the banner then shows without a date.
export const researchDeadline: { date: string } | null = { date: '2026-11-10' }

// 11:59:59 PM Pacific on `date`, with the daylight saving offset in force that day.
function endOfDayPacific(date: string) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', timeZoneName: 'longOffset' }).formatToParts(new Date(`${date}T23:59:59Z`))
  const offset = parts.find((part) => part.type === 'timeZoneName')!.value.replace('GMT', '')
  return new Date(`${date}T23:59:59${offset}`)
}

// The deadline to show, or undefined once it has passed. Checked at BUILD time: the site is static
// and only rebuilds when something is pushed to main, so the deadline (and the banner) can stay
// visible after it passes until the next push. Close projects (`status: closed`) to stop
// applications; the Worker rejects closed projects.
export function upcomingResearchDeadline(now = new Date()) {
  if (!researchDeadline || now > endOfDayPacific(researchDeadline.date)) return undefined
  return { ...researchDeadline, label: formatMonthDay(researchDeadline.date) }
}

// The homepage banner runs only while the round is open: at least one project open and the deadline
// (if any) not yet passed.
export function isResearchDeadlinePast(now = new Date()) {
  return researchDeadline !== null && now > endOfDayPacific(researchDeadline.date)
}
