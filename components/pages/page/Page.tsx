'use client'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import type { PagePayload } from '@/types'
import { motion } from 'framer-motion'

export interface PageProps {
  data: PagePayload | null
}

export function Page({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, overview, title, image } = data ?? {}

  return (
    <div>
      {/* Render the Header with title and image */}
      <Header
        title={title}
        description={overview}
        image={
          image
            ? { src: image.asset.url, alt: image.alt || 'Default alt text' }
            : undefined
        }
        centered={true}
      />
      {/* Other content sections could be rendered below */}
      <div className="container mx-auto px-4 mt-6 md:max-w-3xl">
        {body && <CustomPortableText value={body} />}
      </div>
    </div>
  )
}

export default Page
