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
    <div className="space-y-10">
      {/* Hero Section */}
      {hero && (
        <section className="hero relative flex flex-col md:flex-row">
          <div
            className="hero-img w-full h-64 md:h-auto md:w-1/2 bg-cover bg-center"
            style={
              hero.image && { backgroundImage: `url(${hero.image.asset.url})`}
            }
          ></div>
          <div className="relative px-4 py-16 sm:px-6 sm:py-4 md:w-1/2">
            <h1 className="text-4xl font-extrabold leading-snug text-blue sm:text-5xl md:text-6xl text-custom-blue">

              {hero.heading}
            </h1>
            <h2 className="mt-4 text-base text-blue sm:mt-5 sm:text-lg md:text-xl">
              {hero.subheading}
            </h2>
            {hero.optionalText && (
              <p className="mt-3 py-4 text-blue sm:mt-5 sm:text-lg md:text-xl">
                {hero.optionalText}
              </p>
            )}
            {Array.isArray(hero?.buttons) && hero.buttons.length > 0 && (
              <div className="hero-button">
                {hero.buttons.map((button, index) => (
                  <a
                    key={index}
                    href={button.url}
                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-custom-light px-6 font-bold text-neutral-600 transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_rgb(82_82_82)]"
                  >
                    {button.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
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
