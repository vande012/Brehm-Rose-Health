import type { PortableTextBlock } from 'next-sanity'
import type { Image } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface HomePagePayload {
  footer?: PortableTextBlock[];
  overview?: PortableTextBlock[];
  title?: string;
  hero?: Hero;
  logoBanner?: LogoBanner;
  servicesSection?: ServicesPayload;
}

export interface PagePayload {
  body?: PortableTextBlock[];
  name?: string;
  overview?: PortableTextBlock[];
  title?: string;
  slug?: string;
  hero?: Hero;
}

export interface ProjectPayload {
  client?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  duration?: {
    start?: string
    end?: string
  }
  overview?: PortableTextBlock[]
  site?: string
  slug: string
  tags?: string[]
  title?: string
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
  title?: string
}

export interface Logo {
  asset: {
    alt: string
    _id: string;
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
}

export interface Hero {
  heading: string;
  subheading?: string;
  image: {
    asset: {
      url: string;
    };
    alt: string;
  };
  optionalText?: string;
  buttons?: Array<{
    text: string;
    url: string;
  }>;
}

export interface LogoBanner {
  header: string;
  logos: Logo[];
  backgroundColor?: string;
}
export interface ServicesPayload {
  title: string;
  services: Array<{
    image: {
      asset: {
        url: string;
      };
      alt?: string;
    };
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
  }>;
}