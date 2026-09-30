// Single source of truth for external links used across the site.
// NOTE: README.md and docs/discord-info-channel.md hardcode these too — update them manually.
export const links = {
  discord: 'https://discord.gg/uENtNdDPPb',
  // Kept in two pieces so the full address never appears in the page source or this repo,
  // where spam bots look for it. Shown and linked by EmailLink / CopyEmail.
  email: { user: 'aisafetyatuci', domain: 'gmail.com' },
  linktree: 'https://linktr.ee/aisafetyatuci',
}

// The club Google Calendar (public). The homepage embeds it, and /events is built from its
// iCal feed, so events are added in Google Calendar, not in code.
const calendarId = '486927752eaec279ce49734cb5a35dda803140e25ab0aebd3a214ee2bfab158e@group.calendar.google.com'
const calendarFeed = `calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`

export const clubCalendar = {
  feed: `https://${calendarFeed}`,
  // "Subscribe" links: each adds the whole calendar, which then stays in sync on its own.
  google: `https://calendar.google.com/calendar/u/0?cid=${btoa(calendarId)}`,
  apple: `webcal://${calendarFeed}`,
  outlook: `https://outlook.live.com/calendar/0/addfromweb?url=${encodeURIComponent(`https://${calendarFeed}`)}&name=${encodeURIComponent('AI Safety Collective at Irvine')}`,
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
