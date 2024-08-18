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

export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
}

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  title?: string
  hero?: {
    heading?: string
    subheading?: string
    image?: {
      asset: {
        url: string
      }
      alt?: string
    }
    optionalText?: string
    buttons?: Array<{
      text: string
      url: string
    }>;
  };
  logoBanner?: {
    header: string;
    logos: Array<{
      asset: {
        url: string;
        alt?: string;
        metadata?: {
          dimensions: {
            width: number;
            height: number;
          };
        };
      };
    }>;
    backgroundColor?: string;
  };
  servicesSection?: {
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
  };
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
  hero?: {
    heading?: string
    subheading?: string
    image?: {
      asset: {
        url: string
      }
      alt?: string
    }
    optionalText?: string
    buttons?: Array<{
      text: string
      url: string
    }>
  }
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
