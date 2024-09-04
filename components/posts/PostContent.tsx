import { PostsPayload } from '@/types'

interface PostContentProps {
  content: PostsPayload['content']
}

const PostContent = ({ content }: PostContentProps) => {
  console.log('Post content:', content)

  return (
    <div>
      {content.map((block, index) => {
        if (block._type === 'block') {
          return (
            <p key={index}>
              {block.children.map((child, childIndex) => (
                <span key={childIndex}>{child.text}</span>
              ))}
            </p>
          )
        } else if (block._type === 'image') {
          return (
            <div key={index}>
              <img src={block.image?.asset.url} alt={block.alt || 'Image'} />
              {block.caption && <p>{block.caption}</p>}
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

export default PostContent
