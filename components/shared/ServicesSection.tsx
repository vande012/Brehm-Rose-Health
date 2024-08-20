import Link from 'next/link'
import Image from 'next/image'
import type { ServicesPayload } from '@/types'

interface ServicesSectionProps {
  data: ServicesPayload | null
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ data }) => {
  if (!data) return null

  return (
    <section className="services-section py-8">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-8">{data.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.services.map((service, index) => (
            <div
              key={index}
              className="service-card p-6 border border-gray-200 rounded-lg"
            >
              <Image
                src={service.image.asset.url}
                alt={service.image.alt || 'Service Image'}
                width={400}
                height={200}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <Link
                href={service.buttonUrl}
                className="inline-block mt-auto px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
              >
                {service.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
