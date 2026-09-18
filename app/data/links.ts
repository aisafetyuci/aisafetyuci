// Single source of truth for external links used across the site.
// NOTE: README.md and docs/discord-info-channel.md hardcode these too — update them manually.
export const links = {
  discord: 'https://discord.gg/uENtNdDPPb',
  email: 'aisafetyatuci@gmail.com',
  linktree: 'https://linktr.ee/aisafetyatuci',
}

// Coffee-chat booking links, one per director. Restated manually in
// docs/discord-info-channel.md.
export const coffeeChats = [
  { name: 'Dominic', fullName: 'Dominic Mascetti', url: 'https://cal.com/dominicmascetti/coffee' },
  { name: 'Ivan', fullName: 'Ivan Shishkin', url: 'https://cal.com/ivanshishkin/quick-chat' },
  { name: 'Prema', fullName: 'Prema Suthaharan', url: 'https://cal.com/prema-suthaharan/coffee' },
  { name: 'Swaraag', fullName: 'Swaraag Sistla', url: 'https://cal.com/swaraag' },
]

// Weekly fellowship meeting logistics — used by /tif, /get-involved, and structured data.
export const meeting = {
  day: 'Thursdays',
  time: '5–7 PM',
  room: 'TBD',
}
