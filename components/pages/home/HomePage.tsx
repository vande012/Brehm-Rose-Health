'use client'

import { resolveHref } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'
import { urlForImage } from '@/sanity/lib/utils'
import Link from 'next/link'
import ServicesSection from '@/components/shared/ServicesSection'


export interface HomePageProps {
  data: HomePagePayload | null
}

export function HomePage({ data }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { hero, logoBanner, servicesSection } = data ?? {}
  
  console.log('Hero data:', hero)
  console.log('Services Section data:', servicesSection)

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      {hero && (
        <section className="hero relative flex flex-col md:flex-row">
          <div
            className="hero-img w-full h-64 md:h-auto md:w-1/2 bg-cover bg-center"
            style={
              hero.image && { backgroundImage: `url(${hero.image.asset.url})` }
            }
          ></div>
          <div className="relative px-4 py-4 sm:px-6 sm:py-4 md:w-1/2">
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
      {/* Logo Banner Section */}
      {logoBanner && (
        <section
          className="logo-banner-section py-4"
          style={{ backgroundColor: logoBanner.backgroundColor }}
        >
          <div className="container mx-auto overflow-hidden">
            <h2 className="text-center text-2xl font-bold mb-4">
              {logoBanner.header}
            </h2>
            <div className="marquee">
              <div className="marquee-inner flex space-x-8">
                {logoBanner.logos.map((logo, index) => (
                  <img
                    key={index}
                    src={logo.asset?.url}
                    alt={logo.asset?.alt || `Logo ${index + 1}`}
                    className="h-16 w-auto object-contain bg-white" // Constrain the logo height with a background
                    style={{
                      maxHeight: '4rem',
                    }}
                  />
                ))}
                {/* Duplicate logos for continuous effect */}
                {logoBanner.logos.map((logo, index) => (
                  <img
                    key={`duplicate-${index}`}
                    src={logo.asset?.url}
                    alt={logo.asset?.alt || `Logo ${index + 1}`}
                    className="h-16 w-auto object-contain bg-white"
                    style={{
                      maxHeight: '4rem',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      {servicesSection && (
        <ServicesSection
          title={servicesSection.title}
          services={servicesSection.services.map((service) => ({
            imageUrl: service.image.asset.url,
            altText: service.image.alt || 'Service Image',
            title: service.title,
            description: service.description,
            buttonText: service.buttonText,
            buttonUrl: service.buttonUrl,
          }))}
        />
      )}
    </div>
  )
}
export default HomePage