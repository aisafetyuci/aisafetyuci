export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Safety Collective at Irvine',
    alternateName: 'AISCI',
    url: 'https://aisafetyuci.com',
    logo: 'https://aisafetyuci.com/logo.png',
    description: 'A community dedicated to reducing risk from advanced AI through fellowships, reading groups, and research programs at UC Irvine.',
    foundingDate: '2023',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Irvine',
      addressRegion: 'CA',
      postalCode: '92697',
      addressCountry: 'US',
    },
    sameAs: [
      'https://discord.gg/uENtNdDPPb',
    ],
    memberOf: {
      '@type': 'EducationalOrganization',
      name: 'University of California, Irvine',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
