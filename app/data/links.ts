// Single source of truth for external links used across the site.
// NOTE: README.md and docs/discord-info-channel.md hardcode these too — update them manually.
export const links = {
  discord: 'https://discord.gg/uENtNdDPPb',
  email: 'aisafetyatuci@gmail.com',
  linktree: 'https://linktr.ee/aisafetyatuci',
}

// Coffee-chat booking links, one per facilitator. Restated manually in
// docs/discord-info-channel.md. Prema points to her website until she has a booking link.
export const coffeeChats = [
  { name: 'Dominic', url: 'https://cal.com/dominicmascetti/coffee' },
  { name: 'Ivan', url: 'https://cal.com/ivanshishkin/quick-chat' },
  { name: 'Prema', url: 'https://premasuthaharan.com/' },
]

// Weekly fellowship meeting logistics — used by /tif, /get-involved, and structured data.
export const meeting = {
  day: 'Thursdays',
  time: '5–7 PM',
  room: 'HICF 100K',
}
