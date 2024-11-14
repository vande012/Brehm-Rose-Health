import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { allPostsQuery } from '@/sanity/lib/queries'
import { PostsPayload } from '@/types' // Update this import path as needed

// Fetch all the posts
async function getPosts(): Promise<PostsPayload[]> {
  try {
    const rawResponse = await client.fetch(allPostsQuery)

    const posts: PostsPayload[] = rawResponse

    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

// Posts Page Component
export default async function PostsPage() {
  const posts: PostsPayload[] = await getPosts()

  return (
    <div className="container mx-auto px-4 m-2 mb-4">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.slug.current}
            className="border rounded-lg p-4 shadow-lg"
          >
            <Link href={`/posts/${post.slug.current}`}>
              {post.coverImage && (
                <Image
                  src={post.coverImage.asset.url}
                  alt={post.coverImage.alt || post.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  width={200}
                  height={100}
                />
              )}
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <p className="text-gray-500 pt-3">
                By {post.author.name} on{' '}
                {new Date(post.date).toLocaleDateString()}
              </p>
              <p className="mt-2">{post.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
