import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'


import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], showcaseProjects = [], title = '', hero } = data ?? {}

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      
      {hero && (
        <section className="hero">
          <h1>{hero.heading}</h1>
          <h2>{hero.subheading}</h2>
          {hero.image && (
            <img
              src={hero.image.asset.url}
              alt={hero.image.alt || 'Hero Image'}
              className="w-full h-auto"
            />
          )}
          {hero.optionalText && <p>{hero.optionalText}</p>}
          {Array.isArray(hero?.buttons) && hero.buttons.length > 0 && (
            <div className="buttons">
              {hero.buttons.map((button, index) => (
                <a key={index} href={button.url} className="button">
                  {button.text}
                </a>
              ))}
            </div>
          )}
        </section>
      )}
      {/* Header */}
      {title && <Header centered title={title} description={overview} />}
      {/* Showcase projects */}
      {showcaseProjects && showcaseProjects.length > 0 && (
        <div className="mx-auto max-w-[100rem] rounded-md border">
          {showcaseProjects.map((project, key) => {
            const href = resolveHref(project?._type, project?.slug)
            if (!href) {
              return null
            }
            return (
              <Link
                key={key}
                href={href}
                data-sanity={encodeDataAttribute?.([
                  'showcaseProjects',
                  key,
                  'slug',
                ])}
              >
                <ProjectListItem project={project} odd={key % 2} />
              </Link>
            )
          })}
        </div>
      )}
    </div>
    
  )
}

export default HomePage
