import '@/styles/index.css'

import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { toPlainText } from 'next-sanity'
import { Suspense } from 'react'

import { Footer } from '@/components/global/Footer'
import { Navbar } from '@/components/global/Navbar'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { loadHomePage, loadSettings } from '@/sanity/loader/loadQuery'

const LiveVisualEditing = dynamic(
  () => import('@/sanity/loader/LiveVisualEditing'),
)

export async function generateMetadata(): Promise<Metadata> {
  const [{ data: settings }, { data: homePage }] = await Promise.all([
    loadSettings(),
    loadHomePage(),
  ])

  const ogImage = urlForOpenGraphImage(settings?.ogImage)
  const title = homePage?.title ? homePage.title : 'Personal website'
  const description =
    homePage?.description || 'Default description for the personal website'

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      title: title,
      description: description,
      card: 'summary_large_image',
      images: ogImage ? [ogImage] : [],
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#000',
}

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
      {draftMode().isEnabled && <LiveVisualEditing />}
    </div>
  )
}
