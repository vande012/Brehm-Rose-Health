import './globals.css'
import { Metadata } from 'next'
import {
  DM_Sans,
  IBM_Plex_Mono,
  Inter,
  Newsreader,
  PT_Serif,
  Roboto,
} from 'next/font/google'
import Script from 'next/script'
import OrganizationSchema from '@/components/global/StructuredData/OrganizationsSchema'
import { client } from '@/sanity/lib/client' // Make sure to import the Sanity client
import { homePageQuery } from '@/sanity/lib/queries'

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
})
const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  // @todo: understand why extrabold (800) isn't being respected when explicitly specified in this weight array
  // weight: ['500', '700', '800'],
})
const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
  preload: true,
})
const robo = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
})
const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
})
const dmsans = DM_Sans({
  variable: '--font-dmsans',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  verification: {
    google: 'WiUCrIZFvflApljdic8kFCUa6u_0t2tYZgfmt4w22DM',
  },
  other: {
    'google-site-verification': 'WiUCrIZFvflApljdic8kFCUa6u_0t2tYZgfmt4w22DM',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const orgSchema = OrganizationSchema()
  const homeData = await client.fetch(homePageQuery) // Use client.fetch to execute the query
  const heroImage = homeData?.hero?.image

  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable} ${serif.variable} ${robo.variable} ${newsreader.variable} ${dmsans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
         {heroImage && (
          <link
            rel="preload"
            as="image"
            href={heroImage.asset.url}
            imageSrcSet={`${heroImage.asset.url}&w=640 640w, ${heroImage.asset.url}&w=750 750w, ${heroImage.asset.url}&w=828 828w, ${heroImage.asset.url}&w=1080 1080w, ${heroImage.asset.url}&w=1200 1200w, ${heroImage.asset.url}&w=1920 1920w, ${heroImage.asset.url}&w=2048 2048w, ${heroImage.asset.url}&w=3840 3840w`}
          />
        )}
      </head>
      <body>
        {children}

        {/* Google Analytics tag */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}
