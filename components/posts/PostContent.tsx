import { PortableText, PortableTextComponents } from 'next-sanity'
import { PostsPayload } from '@/types'

interface PostContentProps {
  content: PostsPayload['content']
  title: string
  author: {
    name: string
    picture?: {
      asset: {
        url: string
      }
      alt?: string
    }
  }
  date: string
  coverImage?: {
    asset: {
      url: string
    }
    alt?: string
  }
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="flex justify-center my-4">
        <img
          src={value.asset.url}
          alt={value.alt || 'Image'}
          className="w-full max-w-2xl rounded-md"
        />
        {value.caption && <p className="text-sm text-gray-600 text-center mt-2">{value.caption}</p>}
      </div>
    ),
  },
  block: {
    normal: ({ children }) => <p className="text-lg leading-relaxed text-gray-800">{children}</p>,
  },
}

const PostContent = ({ content, title, author, date, coverImage }: PostContentProps) => {
  return (
    <article className="max-w-4xl mx-auto my-8 p-4">
      {/* Post Header */}
      <header className="mb-8 text-center">
        {coverImage && (
          <div className="w-full h-64 overflow-hidden rounded-md mb-4">
            <img
              src={coverImage.asset.url}
              alt={coverImage.alt || 'Cover Image'}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <div className="text-gray-600">
          <span>By {author?.name}</span> | <span>{new Date(date).toLocaleDateString()}</span>
        </div>
      </header>

      {/* Post Content */}
      <div className="prose max-w-none">
        <PortableText value={content} components={components} />
      </div>
    </article>
  )
}

export default PostContent
