import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import { HomePage } from '@/components/pages/home/HomePage'
import { loadHomePage, loadSettings } from '@/sanity/loader/loadQuery'
import { studioUrl } from '@/sanity/lib/api'
const HomePagePreview = dynamic(
  () => import('@/components/pages/home/HomePagePreview'),
)

export default async function IndexRoute() {
  const [homeInitial, settingsInitial] = await Promise.all([
    loadHomePage(),
    loadSettings(),
  ])

  if (draftMode().isEnabled) {
    return <HomePagePreview initial={homeInitial} />
  }

  if (!homeInitial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a homepage yet,{' '}
        <Link href={`${studioUrl}/structure/home`} className="underline">
          create one now
        </Link>
        !
      </div>
    )
  }

  return <HomePage data={homeInitial.data} settings={settingsInitial.data} />
}


