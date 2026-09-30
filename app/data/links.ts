// Single source of truth for external links used across the site.
// NOTE: README.md and docs/discord-info-channel.md hardcode these too — update them manually.
export const links = {
  discord: 'https://discord.gg/uENtNdDPPb',
  // Kept in two pieces so the full address never appears in the page source or this repo,
  // where spam bots look for it. Shown and linked by EmailLink / CopyEmail.
  email: { user: 'aisafetyatuci', domain: 'gmail.com' },
  linktree: 'https://linktr.ee/aisafetyatuci',
  // Public "add this calendar" link for the club Google Calendar (the one embedded on the homepage).
  googleCalendar: 'https://calendar.google.com/calendar/u/0?cid=NDg2OTI3NzUyZWFlYzI3OWNlNDk3MzRjYjVhMzVkZGE4MDMxNDBlMjVhYjBhZWJkM2EyMTRlZTJiZmFiMTU4ZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t',
}

// Coffee-chat booking links, one per director. Restated manually in
// docs/discord-info-channel.md.
export const coffeeChats = [
  { name: 'Dominic', fullName: 'Dominic Mascetti', url: 'https://cal.com/dominicmascetti/coffee' },
  { name: 'Ivan', fullName: 'Ivan Shishkin', url: 'https://cal.com/ivanshishkin/quick-chat' },
  { name: 'Prema', fullName: 'Prema Suthaharan', url: 'https://cal.com/prema-suthaharan/coffee' },
  { name: 'Swaraag', fullName: 'Swaraag Sistla', url: 'https://cal.com/swaraag' },
]

// Donald Bren Hall on the official UCI campus map.
const dbhMapUrl = 'https://map.uci.edu/?id=463#!m/1117348'

// Weekly fellowship meeting logistics — used by /tif, /get-involved, and structured data.
export const meeting = {
  day: 'Thursdays',
  time: '5–7 PM',
  room: 'DBH 1200',
  mapUrl: dbhMapUrl,
}

// Weekly member meeting location — used by /get-involved.
export const memberMeeting = {
  room: 'DBH 1423',
  mapUrl: dbhMapUrl,
}
