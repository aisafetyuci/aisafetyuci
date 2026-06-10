import { links, meeting } from '../data/links'

export default function StructuredData() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Safety Collective at Irvine',
    alternateName: ['AISCI', 'AI Safety at UCI', 'AI Safety at UC Irvine'],
    url: 'https://aisafetyuci.org',
    logo: 'https://aisafetyuci.org/logo.png',
    image: 'https://aisafetyuci.org/images/asinglenet-og.png',
    description:
      'AISCI is a UC Irvine student community for AI alignment and AI safety, running fellowships, reading groups, and research programs focused on reducing risk from advanced AI.',
    foundingDate: '2023',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Irvine',
      addressRegion: 'CA',
      postalCode: '92697',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'Place',
      name: 'University of California, Irvine',
    },
    knowsAbout: [
      'AI alignment',
      'AI safety',
      'Machine learning safety',
      'AI governance',
      'AI policy',
      'AI ethics',
      'AI risk',
      'Existential risk from AI',
      'Mechanistic interpretability',
      'Scalable oversight',
      'AI robustness',
    ],
    keywords: 'AI safety, AI alignment, AI safety UCI, AI alignment UCI, AI alignment Irvine, AI safety Irvine, UC Irvine AI club, UCI AI club, AI safety fellowship, AI alignment fellowship, AISCI, AI Safety Collective at Irvine, AI safety student group, AI alignment reading group, AI safety Orange County',
    sameAs: [links.discord],
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: 'University of California, Irvine',
      url: 'https://uci.edu',
    },
  }

  const educationalOrganization = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'AI Safety Collective at Irvine',
    alternateName: 'AISCI',
    url: 'https://aisafetyuci.org',
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: 'University of California, Irvine',
      url: 'https://uci.edu',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Irvine',
      addressRegion: 'CA',
      postalCode: '92697',
      addressCountry: 'US',
    },
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI Safety Collective at Irvine',
    alternateName: 'AISCI',
    url: 'https://aisafetyuci.org',
  }

  const introFellowshipCourse = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Technical Intro Fellowship',
    description:
      'An 8-week reading and discussion group on AI safety at UC Irvine. Covers the current trajectory of AI, evidence for misalignment, threat models, and technical safety approaches.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'AI Safety Collective at Irvine',
      url: 'https://aisafetyuci.org',
    },
    url: 'https://aisafetyuci.org/tif',
    educationalLevel: 'Undergraduate',
    inLanguage: 'en',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'In-person',
      location: {
        '@type': 'Place',
        name: `${meeting.room}, University of California, Irvine`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Irvine',
          addressRegion: 'CA',
          postalCode: '92697',
          addressCountry: 'US',
        },
      },
    },
  }

  const graphs = [organization, educationalOrganization, website, introFellowshipCourse]

  return (
    <>
      {graphs.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  )
}
