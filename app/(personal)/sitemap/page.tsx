import Link from 'next/link'

import { client } from '@/sanity/lib/client'
import { sitemapQuery } from '@/sanity/lib/queries'
import { SitemapResponse } from '@/types' // Assuming this is your types file

const Sitemap = async () => {
  // Fetch sitemap data from Sanity
  const sitemapData: SitemapResponse = await client.fetch(sitemapQuery)
  console.log('Fetched Sitemap Data:', sitemapData) // Log the fetched data
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Sitemap
      </h1>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {/* Main Pages */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Main Pages</h2>
            <ul className="space-y-2 text-left">
              <li>
                <Link href="/" className="text-blue-600 hover:underline">
                  Home
                </Link>
              </li>
              {sitemapData.pages?.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/${page.slug}`}
                    className="text-blue-600 hover:underline capitalize"
                  >
                    {page.slug.replace(/-/g, ' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Posts */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>
            <ul className="space-y-2 text-left">
              <li>
                <Link href="/posts" className="text-blue-600 hover:underline">
                  All Posts
                </Link>
              </li>
              {sitemapData.posts?.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {post.slug.replace(/-/g, ' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sitemap
