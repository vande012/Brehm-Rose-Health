import type { MetadataRoute } from 'next'

import { SitemapResponse } from '@/types' // Ensure this import is correct based on your project structure

import { sitemapQuery } from '../sanity/lib/queries' // Adjust the import according to your project structure
import { loadQuery } from '../sanity/loader/loadQuery' // Adjust the import according to your project structure
import { loadSitemap } from '../sanity/loader/loadQuery'

type SitemapEntry = {
  url: string
  lastModified?: string | Date
  changeFrequency?:
    | 'yearly'
    | 'monthly'
    | 'weekly'
    | 'always'
    | 'hourly'
    | 'daily'
    | 'never'
  priority?: number
  homePage?: { slug: string }
}

function isSlugObject(
  slug: string | { current: string },
): slug is { current: string } {
  return typeof slug === 'object' && 'current' in slug
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch data using the sitemapQuery
    const response = await loadSitemap()
    console.log('Sitemap Response:', response)

    const pages = response?.data?.pages || []
    const posts = response?.data?.posts || []

    console.log('Pages Data:', pages)
    console.log('Posts Data:', posts)

    // Base URL of your site
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

    // Always include the homepage URL
    const homePageUrl: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: `${baseUrl}/posts`, // Add the parent posts page
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ]

    // Map through pages and posts to generate URLs
    const pageUrls: MetadataRoute.Sitemap = pages.map(
      (page: { slug: string }) => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      }),
    )

    const postUrls: MetadataRoute.Sitemap = posts.map(
      (post: { slug: string | { current: string } }) => {
        const slugValue = isSlugObject(post.slug)
          ? post.slug.current
          : post.slug
        console.log('Post Slug:', slugValue)
        return {
          url: `${baseUrl}/posts/${slugValue}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.5,
        }
      },
    )
    // Return all URLs, including static ones
    return [...homePageUrl, ...pageUrls, ...postUrls]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return []
  }
}
