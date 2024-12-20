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
  description?: string
  hero?: {
    heading?: string
    subheading?: string
    image?: {
      asset: {
        url: string
      }
      alt?: string
    }
    optionalText?: PortableTextBlock[]
    buttons?: Array<{
      text: string
      url: string
    }>
  }
  logoBanner?: {
    header: string
    logos: Array<{
      asset: {
        url: string
        alt?: string
        metadata?: {
          dimensions: {
            width: number
            height: number
          }
        }
      }
    }>
    backgroundColor?: string
  }
  servicesSection?: {
    title: string
    services: Array<{
      image: {
        asset: {
          url: string
        }
        alt?: string
      }
      title: string
      description: string
      buttonText: string
      buttonUrl: string
    }>
  }
  partnersSection?: {
    title: string
    buttonText: string
    buttonUrl: string
    partners: Array<{
      name: string
      image: {
        asset: {
          url: string
        }
        alt?: string
      }
      description: PortableTextBlock[]
    }>
  }
  reviewsSection?: {
    title: string
    reviews: Array<{
      name: string
      review: PortableTextBlock[]
      image: {
        asset: {
          url: string
        }
        alt?: string
      }
    }>
  }
  whySection?: {
    heading?: string
    subheading?: string
    blockLeft?: PortableTextBlock[]
    blockRight?: PortableTextBlock[]
  }
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
  image?: {
    asset: {
      url: string
    }
    alt?: string
  }
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
  title?: string
  phoneNumber?: string
  posts?: PostsPayload[]
}

export interface Logo {
  asset: {
    _id: string
    url: string
    metadata: {
      dimensions: {
        width: number
        height: number
      }
    }
  }
}
export interface FormField {
  required: boolean
  fieldName: string
  placeholder: string
  fieldId: string
  inputType: string
  isRequiredWhenMultiSelect: boolean
  type: Array<{ title: string; value: string }>
}

export interface FormFieldsPayload {
  formFields: FormField[]
}

export interface PostsPayload {
  title: string
  slug: {
    current: string
  }
  content: PortableTextBlock[]
  excerpt?: string
  coverImage?: {
    asset: {
      url: string
    }
    alt?: string
  }
  date: string
  author: {
    name: string
    picture?: {
      asset: {
        url: string
      }
      alt?: string
    }
  }
}

export interface SitemapResponse {
  homePage?: { slug: string }
  pages?: { slug: string }[]
  posts?: { slug: string }[]
}
