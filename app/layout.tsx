import './globals.css'

import {
  DM_Sans,
  IBM_Plex_Mono,
  Inter,
  Newsreader,
  PT_Serif,
  Roboto,
} from 'next/font/google'

import dynamic from 'next/dynamic'

const OrganizationSchema = dynamic(() => import('@/components/global/StructuredData/OrganizationsSchema'), { ssr: false })

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})
const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  // @todo: understand why extrabold (800) isn't being respected when explicitly specified in this weight array
  // weight: ['500', '700', '800'],
})
const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})
const robo = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '700'],
})
const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  weight: ['400', '700'],
})
const dmsans = DM_Sans({
  variable: '--font-dmsans',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable} ${serif.variable} ${robo.variable} ${newsreader.variable} ${dmsans.variable}`}
    >
      <body>
        <OrganizationSchema />
        {children}
      </body>
    </html>
  )
}
