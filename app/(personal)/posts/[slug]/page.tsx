import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { postBySlugQuery } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { PostsPayload } from '@/types'
import PostContent from '@/components/posts/PostContent'

export async function generateStaticParams() {
  const slugs = await generateStaticSlugs('post')
  return slugs.map((slug) => {
    return { slug: slug.toString() } // Ensure slug is a string
  })
}

export async function getPost(slug: string) {
  const post = await client.fetch(postBySlugQuery, { slug })

  return post
}

// Function to generate metadata dynamically
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post: PostsPayload = await getPost(params.slug)

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
  const post: PostsPayload = await getPost(params.slug)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <PostContent
      content={post.content}
      title={post.title}
      author={post.author}
      date={post.date}
      coverImage={post.coverImage}
    />
  )
}