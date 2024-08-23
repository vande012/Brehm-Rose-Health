'use client'

import type { PortableTextBlock } from 'next-sanity'
import { resolveHref } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'
import { urlForImage } from '@/sanity/lib/utils'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
export interface HomePageProps {
  data: HomePagePayload | null
}

export function HomePage({ data }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { hero, logoBanner, servicesSection, reviewsSection } = data ?? {}
  
 
  return (
    <div className="space-y-6 py-8 bg-gray-100">
      {/* Hero Section */}
      {hero && (
        <motion.section
          className="hero relative flex flex-col md:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="hero-img w-full h-64 md:h-auto md:w-1/2 bg-cover bg-center"
            style={
              hero.image && { backgroundImage: `url(${hero.image.asset.url})` }
            }
          ></div>
          <motion.div
            className="relative px-4 py-4 sm:px-6 sm:py-4 md:w-1/2"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-extrabold leading-snug text-blue text-2xl sm:text-3xl md:text-4xl lg:text-4xl lg:text-center text-custom-blue">
              {hero.heading}
            </h1>
            <h2 className="my-4 leading-snug text-custom-blue text-md sm:text-base md:text-lg lg:text-xl lg:text-center">
              {hero.subheading}
            </h2>
            {hero?.optionalText ? (
              <CustomPortableText
                paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
                value={hero.optionalText}
              />
            ) : (
              <p>No optional text available</p>
            )}
            {Array.isArray(hero?.buttons) && hero.buttons.length > 0 && (
              <motion.div
                className="hero-button lg:text-center"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {hero.buttons.map((button, index) => (
                  <Link
                    key={index}
                    href={button.url}
                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-transparent bg-gradient-to-r from-custom-blue to-custom-green px-6 font-bold text-white transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_rgb(82_82_82)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-blue"
                  >
                    {button.text}
                  </Link>
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}
      {/* Logo Banner Section */}
      {logoBanner && (
        <motion.section
          className="logo-banner-section py-4"
          style={{ backgroundColor: logoBanner.backgroundColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto py-8 overflow-hidden">
            <h2 className="text-center text-3xl font-bold mb-4 text-custom-blue">
              {logoBanner.header}
            </h2>
            <div className="marquee">
              <div className="marquee-inner flex space-x-8 pt-6">
                {logoBanner.logos.map((logo, index) => (
                  <motion.img
                    key={index}
                    src={logo.asset?.url}
                    alt={logo.asset?.alt || `Logo ${index + 1}`}
                    className="h-32 w-auto object-contain bg-white"
                    style={{
                      maxHeight: '6rem',
                    }}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                ))}
                {/* Duplicate logos for continuous effect */}
                {logoBanner.logos.map((logo, index) => (
                  <motion.img
                    key={`duplicate-${index}`}
                    src={logo.asset?.url}
                    alt={logo.asset?.alt || `Logo ${index + 1}`}
                    className="h-40 w-auto object-contain bg-white"
                    style={{
                      maxHeight: '4rem',
                    }}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}
      {/* Services Section */}
      {servicesSection && (
        <section>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesSection.services.map((service, index) => (
                <div
                  key={index}
                  className="service-card p-6 border border-gray-200 bg-white rounded-lg shadow-md"
                >
                  {service.image.asset?.url && (
                    <img
                      src={service.image.asset.url}
                      alt={service.image.alt || 'Service Image'}
                      className="w-full h-48 object-cover mb-4 rounded-md"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p>{service.description}</p>
                  <Link href={service.buttonUrl} key={service.buttonUrl}>
                    <span className="inline-block mt-auto px-6 py-2 text-white bg-custom-blue hover:bg-custom-green rounded">
                      {service.buttonText}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Reviews Section */}
      {reviewsSection && (
        <motion.section
          className="reviews-section py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto py-8 overflow-hidden">
            <h2 className="text-center text-3xl font-bold mb-4 text-custom-blue">
              {reviewsSection.title}
            </h2>
            <div className="marquee">
              <div className="marquee-inner flex space-x-8 pt-6">
                {reviewsSection.reviews.map((review, index) => (
                  <motion.div
                    key={index}
                    className="testimonial-card p-6 border border-gray-200 bg-white rounded-lg shadow-md"
                    style={{
                      maxWidth: '30rem',
                    }}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <p className="text-gray-700 mb-4">{review.review}
                    
                    </p>
                    <p className="text-xs font-light italic">{review.name}</p>
                    {review.image?.asset?.url && (
                      <img
                        src={review.image.asset.url}
                        alt={review.name}
                        className="w-12 h-12 rounded-full mt-4"
                      />
                    )}
                  </motion.div>
                ))}
                {/* Duplicate reviews for continuous effect */}
                {reviewsSection.reviews.map((review, index) => (
                  <motion.div
                    key={`duplicate-${index}`}
                    className="testimonial-card p-6 border border-gray-200 bg-white rounded-lg shadow-md"
                    style={{
                      maxWidth: '30rem',
                    }}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <p className="text-gray-700 mb-4">{review.review}</p>
                    <p className="text-xs font-light italic">{review.name}</p>
                    {review.image?.asset?.url && (
                      <img
                        src={review.image.asset.url}
                        alt={review.name}
                        className="w-12 h-12 rounded-full mt-4"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  )
}

export default HomePage
