import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity'
import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import type { Image } from 'sanity'

import ImageBox from '@/components/shared/ImageBox'
import { TimelineSection } from '@/components/shared/TimelineSection'

export function CustomPortableText({
  paragraphClasses = 'my-4 leading-relaxed',
  value,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[] | undefined
}) {
  if (!Array.isArray(value)) {
    console.error(
      'Invalid value prop passed to CustomPortableText component. Expected an array of PortableTextBlock objects.',
    )
    return null
  }

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => <p className={paragraphClasses}>{children}</p>,
      h1: ({ children }) => (
        <h1 className="text-4xl md:text-5xl font-bold mt-8 mb-4 text-center">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl md:text-4xl font-semibold mt-12 mb-3 text-center">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl md:text-2xl font-medium mt-4 mb-2">
          {children}
        </h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6">
          {children}
        </blockquote>
      ),
    },
    marks: {
      link: ({ children, value }) => (
        <a
          className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200 inline-flex items-center"
          href={value?.href}
          rel="noreferrer noopener"
          target="_blank"
        >
          {children}
          <FaExternalLinkAlt className="ml-1 h-3 w-3" />
        </a>
      ),
      strong: ({ children }) => (
        <strong className="font-semibold">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      center: ({ children }) => (
        <div style={{ textAlign: 'center' }}>{children}</div>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-5 my-6 text-lg space-y-2">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-5 my-4 space-y-2">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string }
      }) => {
        if (!value) return null

        return (
          <figure className="my-8 mx-auto max-w-2xl">
            <ImageBox
              image={value}
              alt={value.alt || 'Image'}
              classesWrapper="relative aspect-[16/9] rounded-lg overflow-hidden max-w-full h-auto"
              height={100}
              width={100}
            />
            {value?.caption && (
              <figcaption className="text-center text-sm text-gray-600 mt-2">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
      timeline: ({ value }) => {
        const { items } = value || {}
        return <TimelineSection timelines={items || []} />
      },
    },
  }

  if (!value || !Array.isArray(value)) return null

  return (
    <div className="max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <PortableText components={components} value={value} />
    </div>
  )
}
