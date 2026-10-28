// One-time setup: creates the Projects, Applicants and Applications tables (with the exact field
// names src/index.ts writes) in the AISCI Research base. Safe to re-run: existing tables and
// fields are left alone and only missing ones are added. Needs a token with schema.bases:write.
//
// From this folder:  read -rs "AIRTABLE_TOKEN?Airtable token: " && AIRTABLE_TOKEN="$AIRTABLE_TOKEN" node setup-airtable.mjs

const baseId = 'appfUAuZPmRRCXks8'
const token = process.env.AIRTABLE_TOKEN
if (!token) {
  console.error('Set AIRTABLE_TOKEN first (see the command at the top of this file).')
  process.exit(1)
}

const api = `https://api.airtable.com/v0/meta/bases/${baseId}/tables`

async function call(url, method = 'GET', body) {
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${method} ${url.replace(api, 'tables')} failed (${res.status}): ${JSON.stringify(data.error ?? data)}`)
  return data
}

// Choice names must match what the form sends (app/research/apply/ApplyForm.tsx).
const select = (names) => ({ type: 'singleSelect', options: { choices: names.map((name) => ({ name })) } })
const text = { type: 'singleLineText' }
const long = { type: 'multilineText' }
const whole = { type: 'number', options: { precision: 0 } }

const tables = [
  {
    name: 'Projects',
    fields: [
      { name: 'Slug', ...text },
      { name: 'Title', ...text },
    ],
  },
  {
    name: 'Applicants',
    fields: [
      { name: 'Name', ...text },
      { name: 'Email', type: 'email' },
      { name: 'Age', ...whole },
      { name: 'Affiliation', ...select(['UCI student', 'Student at another school', 'Not currently a student']) },
      { name: 'School', ...text },
      { name: 'Year or role', ...text },
      { name: 'AISCI member', ...select(['Yes', 'No', 'Not sure']) },
      { name: 'Hours per week', ...select(['1–3', '3–6', '6–10', '10+']) },
      { name: 'Format', ...select(['In person', 'Online', 'Either']) },
      { name: 'Based in', ...text },
      { name: 'Experience', ...long },
      { name: 'Links', ...long },
      { name: 'Anything else', ...long },
      { name: 'Possible duplicate', type: 'checkbox', options: { icon: 'check', color: 'yellowBright' } },
    ],
  },
  {
    name: 'Applications',
    fields: [
      { name: 'Summary', ...text },
      { name: 'Applicant', type: 'multipleRecordLinks', link: 'Applicants' },
      { name: 'Project', type: 'multipleRecordLinks', link: 'Projects' },
      { name: 'Rank', ...whole },
      { name: 'Interest', ...long },
      { name: 'First to explore', ...long },
      { name: 'Extra answer', ...long },
      { name: 'Review status', ...select(['New', 'Shortlisted', 'Interview', 'Accepted', 'Declined']) },
      { name: 'Reviewer notes', ...long },
      { name: 'Score', type: 'rating', options: { max: 5, icon: 'star', color: 'yellowBright' } },
    ],
  },
]

const existing = new Map((await call(api)).tables.map((t) => [t.name, t]))

for (const table of tables) {
  // Link fields need the linked table's id, known only once that table exists.
  const resolve = ({ link, ...field }) =>
    link ? { ...field, options: { linkedTableId: existing.get(link).id } } : field

  const found = existing.get(table.name)
  if (!found) {
    const created = await call(api, 'POST', { name: table.name, fields: table.fields.map(resolve) })
    existing.set(table.name, created)
    console.log(`Created table ${table.name} (${table.fields.length} fields)`)
    continue
  }
  const have = new Set(found.fields.map((f) => f.name))
  const missing = table.fields.filter((f) => !have.has(f.name))
  for (const field of missing) {
    await call(`${api}/${found.id}/fields`, 'POST', resolve(field))
    console.log(`Added ${table.name} → ${field.name}`)
  }
  if (missing.length === 0) console.log(`Table ${table.name} already complete`)
}

console.log('\nDone. Two things to do by hand in Airtable:')
console.log('  1. Applicants: add a field named "Submitted" of type "Created time" (the API cannot create it).')
console.log('  2. Delete the leftover "Table 1" (right-click its tab → Delete table).')
