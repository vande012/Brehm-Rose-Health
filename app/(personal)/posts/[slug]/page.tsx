import PostContent from '@/components/posts/PostContent'
import { client } from '@/sanity/lib/client'
import { allPostsQuery, postBySlugQuery } from '@/sanity/lib/queries'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { PostsPayload } from '@/types'

export async function generateStaticParams() {
  try {
    const posts = await client.fetch(allPostsQuery)
    console.log('All fetched posts:', posts)

    const params = posts.map((post) => {
      const stringSlug = post.slug.current

      return { slug: stringSlug }
    })

    return params
  } catch (error) {
    return []
  }
}

async function getPost(slug: string): Promise<PostsPayload | null> {
  try {
    console.log(`Fetching post with slug: ${slug}`)
    const post = await client.fetch(postBySlugQuery, { slug })

    if (post) {
      console.log(`Successfully fetched post: ${post.title}`)
      console.log('Post data:', JSON.stringify(post, null, 2))
    } else {
      console.log(`No post found with slug: ${slug}`)
    }

    return post
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error)
    return null
  }
}

// Function to generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: 'Post not found',
      description: 'The post you are looking for does not exist.',
    }
  }

  return {
    title: post.title,
    description: post.excerpt || 'Read this amazing post!',
    openGraph: {
      title: post.title,
      description: post.excerpt || 'Read this amazing post!',
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  console.log(`Rendering PostPage for slug: ${params.slug}`)

  try {
    const post = await getPost(params.slug)

    if (!post) {
      console.log(`Post not found for slug: ${params.slug}`)
      return <div>Post not found. Slug: {params.slug}</div>
    }

    console.log(`Rendering PostContent for: ${post.title}`)
    return (
      <PostContent
        content={post.content}
        title={post.title}
        author={post.author}
        date={post.date}
        coverImage={post.coverImage}
      />
    )
  } catch (error) {
    console.error(`Error rendering PostPage for slug ${params.slug}:`, error)
    return <div>Error loading post. Please try again later.</div>
  }
}
