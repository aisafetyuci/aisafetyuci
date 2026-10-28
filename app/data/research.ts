// Research project applications: the deadline, set once here. It's shown in the homepage banner,
// the /research header and each open project's apply box.
// NOTE: docs/discord-info-channel.md restates the deadline — update it manually.
import { formatMonthDay } from './events'

// `date` is what the site shows ("Nov 10"); `closesAt` is the exact moment (end of day, Pacific).
// Set to null when the next round has no fixed deadline yet: the banner then shows without a date.
export const researchDeadline: { date: string; closesAt: string } | null = {
  date: '2026-11-10',
  closesAt: '2026-11-10T23:59:59-08:00',
}

// The deadline to show, or undefined once it has passed. Checked at BUILD time: the site is static
// and only rebuilds when something is pushed to main, so the deadline (and the banner) can stay
// visible after it passes until the next push. Close projects (`status: closed`) to stop
// applications; the Worker rejects closed projects.
export function upcomingResearchDeadline(now = new Date()) {
  if (!researchDeadline || now > new Date(researchDeadline.closesAt)) return undefined
  return { ...researchDeadline, label: formatMonthDay(researchDeadline.date) }
}

// The homepage banner runs only while the round is open: at least one project open and the deadline
// (if any) not yet passed.
export function isResearchDeadlinePast(now = new Date()) {
  return researchDeadline !== null && now > new Date(researchDeadline.closesAt)
}
