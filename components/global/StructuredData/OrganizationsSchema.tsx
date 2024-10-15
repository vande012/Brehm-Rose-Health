import React from 'react'
import Head from 'next/head'

const OrganizationSchema = () => {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Brehm-Rose Health',
    url: 'https://www.brehmrosehealth.com',
    logo: 'https://www.brehmrosehealth.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-262-691-9880',
      contactType: 'customer service',
    },
    sameAs: [
      'https://www.facebook.com/profile.php?id=100068605512068',
      'https://www.linkedin.com/company/brehm-rose-health',
      // Add other social media profiles here
    ],
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    </Head>
  )
}

export default OrganizationSchema
