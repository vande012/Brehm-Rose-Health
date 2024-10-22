'use client'

import { motion } from 'framer-motion'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import type { PagePayload } from '@/types'

export interface PageProps {
  data: PagePayload | null
}

export function Page({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, overview, title, image } = data ?? {}

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
      <main className="pages mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:my-12 max-w-4xl lg:max-w-6xl text-lg">
        {body && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <CustomPortableText value={body} />
          </motion.div>
        )}
      </main>
    </motion.div>
  )
}

export default Page
