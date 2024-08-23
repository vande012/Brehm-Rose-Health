import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity'
import type { Image } from 'sanity'

import ImageBox from '@/components/shared/ImageBox'
import { TimelineSection } from '@/components/shared/TimelineSection'
import React from 'react'

export function CustomPortableText({
  paragraphClasses = 'my-4', // Default paragraph classes
  value,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[] | undefined // Allow for undefined values
}) {
  console.log('CustomPortableText value:', JSON.stringify(value, null, 2))
  if (!Array.isArray(value)) {
    console.error(
      'Invalid value prop passed to CustomPortableText component. Expected an array of PortableTextBlock objects.',
    )
    return null
  }
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <React.Fragment>
            <a
              className="underline transition hover:opacity-50"
              href={value?.href}
              rel="noreferrer noopener"
            >
              {children}
            </a>
          </React.Fragment>
        )
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string }
      }) => {
        if (!value) return null // Return null if value is not defined

        return (
          <div className="my-6 space-y-2">
            <ImageBox
              image={value}
              alt={value.alt || 'Image'} // Default alt text if none is provided
              classesWrapper="relative aspect-[16/9]"
            />
            {value?.caption && (
              <div className="font-sans text-sm text-gray-600">
                {value.caption}
              </div>
            )}
          </div>
        )
      },
      timeline: ({ value }) => {
        const { items } = value || {}
        return <TimelineSection timelines={items || []} /> // Ensure items is defined
      },
    },
  }
  console.log('CustomPortableText value:', JSON.stringify(value, null, 2))
  // Render only if value is defined and is an array
  if (!value || !Array.isArray(value)) return null

  return <PortableText components={components} value={value} />
}
