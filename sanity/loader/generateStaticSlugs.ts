import 'server-only'

import { groq } from 'next-sanity'

import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'

// Used in `generateStaticParams`
export async function generateStaticSlugs(type: string): Promise<string[]> {
  try {
    return await client
      .withConfig({
        token,
        perspective: 'published',
        useCdn: false,
        stega: false,
      })
      .fetch<string[]>(
        groq`*[_type == $type && defined(slug.current)]{"slug": slug.current}`,
        { type },
        {
          next: {
            tags: [`slug-${type}`],
          },
        },
      )
  } catch (error) {
    console.error(`Failed to fetch slugs for type ${type}:`, error)
    return []
  }
}
