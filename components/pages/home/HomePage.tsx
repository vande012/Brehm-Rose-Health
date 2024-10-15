'use client'

import type { HomePagePayload, SettingsPayload } from '@/types'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
export interface HomePageProps {
  data: HomePagePayload | null
  settings: SettingsPayload | null
}
export function HomePage({ data, settings }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  console.log('Home page data:', data)
  const {
    hero,
    logoBanner,
    servicesSection,
    reviewsSection,
    partnersSection,
    whySection,
  } = data ?? {}
  const { phoneNumber } = settings ?? {}

  return (
    <div className=" bg-white">
      {/* Hero Section */}
      {hero && (
        <motion.section
          className="hero relative flex flex-col md:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          <div
            className="hero-img w-full h-64 md:h-auto md:w-1/2 bg-cover bg-center mt-6 transform-none"
            style={
              hero.image && { backgroundImage: `url(${hero.image.asset.url})` }
            }
          ></div>
          <motion.div
            className="relative px-4 py-4 sm:px-6 sm:py-4 md:w-1/2"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="mt-4 pb-6 text-center font-extrabold leading-snug text-blue text-4xl sm:text-6xl md:text-4xl lg:text-5xl lg:text-center text-custom-blue">
              {hero.heading}
            </h1>
            <h2 className="scroll-m-20 border-b pb-3 text-xl font-semibold tracking-tight text-center first:mt-0 text-custom-blue sm:text-base md:text-lg lg:text-2xl lg:text-center">
              {hero.subheading}
            </h2>
            {hero?.optionalText ? (
              <div className="pt-4 md:block lg:ml-20 lg:mt-8">
                <CustomPortableText
                  paragraphClasses="max-w-3xl text-gray-600 text-2xl"
                  value={hero.optionalText}
                />
              </div>
            ) : (
              <p className="hidden md:block">No optional text available</p>
            )}
            <motion.div
              className="hero-button text-center py-6"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/about-us"
                className="group relative inline-flex h-12 items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-custom-blue to-custom-green px-6 font-bold text-white transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_rgb(82_82_82)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-blue"
              >
                Read More
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
      {/* Logo Banner Section */}
      {logoBanner && (
        <motion.section
          className="logo-banner-section py-12"
          style={{ backgroundColor: logoBanner.backgroundColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="overflow-hidden">
            <h2 className="text-center text-4xl font-bold pb-12 text-custom-blue">
              {logoBanner.header}
            </h2>
            <div className="marquee">
              <div className="marquee-inner">
                {logoBanner.logos.map((logo, index) => (
                  <img
                    key={index}
                    src={logo.asset?.url}
                    alt={logo.asset?.alt || `Logo ${index + 1}`}
                    className="h-32 w-auto object-contain bg-white px-8"
                    style={{
                      maxHeight: '8rem',
                    }}
                  />
                ))}
                {/* Duplicate logos for continuous effect */}
                {logoBanner.logos.map((logo, index) => (
                  <img
                    key={`duplicate-${index}`}
                    src={logo.asset?.url}
                    alt={logo.asset?.alt || `Logo ${index + 1}`}
                    className="h-32 w-auto object-contain bg-white px-8"
                    style={{
                      maxHeight: '8rem',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}
      {/* Services Section */}
      {servicesSection && (
        <section className="bg-custom-blue">
          <div className="container mx-auto py-12 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {servicesSection.services.map((service, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                  {service.image.asset?.url && (
                    <img
                      src={service.image.asset.url}
                      alt={service.image.alt || 'Service Image'}
                      className="w-full h-48 object-cover mb-4 rounded-md"
                    />
                  )}
                  <h3 className="text-2xl font-semibold text-custom-blue mb-2 py-2 text-center">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 text-lg py-2">
                    {service.description}
                  </p>
                  <div className="flex justify-center mt-4">
                    <Link href={service.buttonUrl} key={service.buttonUrl}>
                      <span className="inline-block px-6 py-2 bg-custom-blue text-white hover:bg-custom-green rounded transition duration-300 ease-in-out">
                        {service.buttonText}
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {partnersSection && (
        <motion.section
          className="partners-section bg-custom-light py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-custom-blue">
              {partnersSection.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8">
              {partnersSection.partners.slice(0, 4).map((partner, index) => (
                <motion.div
                  key={index}
                  className="partner-card p-6 border border-gray-200 bg-white rounded-lg shadow-xl transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  {partner.image?.asset?.url && (
                    <img
                      src={partner.image.asset.url}
                      alt={partner.image.alt || 'Partner Logo'}
                      className="w-full h-32 object-contain mb-4 rounded-md"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    {partner.name}
                  </h3>
                  {partner.description && (
                    <CustomPortableText
                      paragraphClasses="text-center text-gray-700 text-base"
                      value={partner.description}
                    />
                  )}
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Link href={partnersSection?.buttonUrl}>
                <span className="text-center mt-6 px-6 py-6 text-white bg-custom-blue hover:bg-custom-green rounded">
                  {partnersSection?.buttonText}
                </span>
              </Link>
            </div>
          </div>
        </motion.section>
      )}
      {whySection && (
        <motion.section
          className="why-section py-16 bg-custom-blue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {whySection.heading}
              </h2>
              {whySection.subheading && (
                <h3 className="text-xl md:text-2xl font-medium text-white opacity-90">
                  {whySection.subheading}
                </h3>
              )}
            </div>

            <div className="text-center text-white mb-12">
              <p className="text-xl md:text-2xl leading-relaxed mb-4">
                At Brehm-Rose Health, we stand out in the crowded insurance
                landscape by offering a truly personalized experience.
              </p>
              <p className="text-2xl md:text-3xl font-semibold pt-2">
                Here's how we differ:
              </p>
            </div>

            <div className="why-list grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
                <CustomPortableText
                  paragraphClasses="text-white leading-relaxed mb-4"
                  value={whySection.blockLeft}
                />
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
                <CustomPortableText
                  paragraphClasses="text-white text-lg leading-relaxed mb-4"
                  value={whySection.blockRight}
                />
              </div>
            </div>

            <div className="text-center text-white">
              <p className="text-xl md:text-2xl leading-relaxed mb-4">
                Choose Brehm-Rose Health for a helpful, personalized insurance
                experience that puts your needs first.
              </p>
              <p className="text-xl md:text-2xl leading-relaxed">
                Let us simplify your insurance journey today!
              </p>
            </div>
          </div>
        </motion.section>
      )}
      {/* Reviews Section */}
      {reviewsSection && (
        <motion.section
          className="reviews-section py-4 flex flex-wrap justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="w-full text-center text-3xl font-bold mb-4 text-custom-blue">
            {reviewsSection.title}
          </h2>
          <div className="w-full flex flex-wrap justify-center">
            {reviewsSection.reviews.map((review, index) => (
              <motion.div
                key={index}
                className="testimonial-card p-6 border border-gray-200 bg-white rounded-lg shadow-md m-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <CustomPortableText
                  paragraphClasses="max-w-3xl text-gray-600 text-xl"
                  value={review.review}
                />
                <p className="text-md font-light italic text-end">
                  {review.name}
                </p>
                {review.image?.asset?.url && (
                  <div className="flex justify-center">
                    <img
                      src={review.image.asset.url}
                      alt={review.name}
                      className="w-42 h-32 rounded-full mt-4"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
      ,
      <motion.section
        className="contact relative flex flex-col md:flex-row bg-custom-blue py-6 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="contact-text flex flex-col text-center md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4 text-white">Contact Us</h2>
          <p className="text-lg text-white">
            Lets get you covered, send us a message or give us a call! -&nbsp;
            {phoneNumber}
          </p>
        </div>
        <div className="contact-button my-4 flex items-center justify-center md:w-1/2">
          <motion.div
            className="flex flex-end mr-5"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 3 }}
          >
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </motion.div>
          <Link href="/contact">
            <span className="text-center text-lg mt-auto px-6 py-4 text-custom-blue bg-white hover:bg-custom-green rounded hover:text-white">
              Send us a message
            </span>
          </Link>
        </div>
      </motion.section>
    </div>
  )
}

export default HomePage
