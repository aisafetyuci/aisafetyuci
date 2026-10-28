import type { EventCategory } from './events'

// Things Google Calendar can't hold, added to calendar events after the fact: photos, headcounts,
// and which past events to feature. Each entry is matched to a calendar event by its title
// (capitalization and punctuation don't matter). Add `date` when the same title repeats.
//
// Photos go in public/images/events/ (landscape, ~1200px wide, .webp or .jpg).
//
// Example:
//   {
//     title: 'End-of-Year Beach Social',
//     image: { src: '/images/events/beach-social-2026.webp', alt: 'Members around a bonfire on the beach at sunset' },
//     attendance: 40,
//     highlight: true,
//   },

export type EventExtra = {
  title: string
  /** YYYY-MM-DD: only needed when several calendar events share the title. */
  date?: string
  image?: { src: string; alt: string; credit?: string }
  attendance?: number
  /** Feature in the photo cards at the top of the Past tab (needs an image). */
  highlight?: boolean
  /** Override the category guessed from the title. */
  category?: EventCategory
  /** Leave this calendar event off the website. */
  hidden?: boolean
}

export const eventExtras: EventExtra[] = []
