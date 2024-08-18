import Link from 'next/link';
import Image from 'next/image';

interface ServiceCard {
  imageUrl: string;
  altText: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

interface ServicesSectionProps {
  title: string;
  services: ServiceCard[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  title,
  services,
}) => {
  return (
    <section className="services-section py-8">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-8">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card p-6 border border-gray-200 rounded-lg"
            >
              <Image
                src={service.imageUrl}
                alt={service.altText}
                width={400}
                height={200}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <Link href={service.buttonUrl} key={service.buttonUrl}>
                <a className="inline-block mt-auto px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded">
                  {service.buttonText}
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;