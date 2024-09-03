import { CustomPortableText } from '@/components/shared/CustomPortableText'

interface HeaderProps {
  centered?: boolean
  description?: any[]
  title?: string
  image?: {
    src: string
    alt: string
  }
}

export function Header(props: HeaderProps) {
  const { title, description, centered = false, image } = props
  if (!description && !title && !image) {
    return null
  }
  return (
    <div className="relative w-full h-60">
      {/* Image */}
      {image && (
        <img
          src={image.src}
          alt={image.alt}
          className="object-cover w-full h-full"
        />
      )}
      {/* Overlay and Title */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white text-center">
          {title}
        </h1>
      </div>
      {/* Description */}
      {description && (
        <div
          className={`hidden ${centered ? 'text-center' : 'w-5/6 lg:w-3/5 mx-auto'}`}
        >
          <CustomPortableText value={description} />
        </div>
      )}
    </div>
  )
}
