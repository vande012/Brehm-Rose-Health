import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0] {
    _id,
    overview,
    title,
    description,
    hero {
      heading,
      subheading,
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      optionalText,
    },
    buttons[] {
      text,
      url
    },
    logoBanner {
      header,
      logos[] {
        asset-> {
          _id,
          url,
          alt,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      },
      backgroundColor
    },
    servicesSection {
      title,
      services[] {
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        title,
        description,
        buttonText,
        buttonUrl
      }
    },
    reviewsSection {
      title,
      reviews[] {
        name,
        review,
        image {
          asset-> {
            _id,
            url
          },
          alt
        }
      }
    },
    partnersSection {
      title,
      buttonText,
      buttonUrl,
      partners[] {
        name,
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        description[] {
          ... // Include Portable Text fields
        }
      }
    },
    whySection {
      heading,
      subheading,
      blockLeft,
      blockRight,
    },
  }
`
export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
    image {
        asset-> {
          _id,
          url
        },
        alt
      },
  }
`
export const settingsQuery = groq`
  *[_type == "settings"][0] {
    footer,
    menuItems[] -> {
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
    posts[] -> {
      _type,
      "slug": slug.current,
      title
    },
    title,
    phoneNumber,
  }
`

export const sitemapQuery = groq`
  {
    // Fetch the homepage slug
    "homePages": *[_type == "home"][0] {
      "slug": "/"
    },
    // Fetch all pages with slugs
    "pages": *[_type == "page" && defined(slug.current)] {
      "slug": slug.current
    },
    // Fetch all posts with slugs
    "posts": *[_type == "post"] []{
      "slug": slug.current
    },
  }
`

export const formQuery = groq`
  *[_type == "formBuilder"][0] {
    formFields[] {
      required,
      fieldName,
      placeholder,
      fieldId,
      inputType,
      isRequiredWhenMultiSelect,
      type[] {
        title,
        value
      }
    }
  }
`

export const faqQuery = groq`
  *[_type == "faq"][0] {
    sections[] {
      title,
      questions[] {
        question,
        answer[] {
          _type == 'block' => {
            children[] {
              _type == 'span' => {
                text
              }
            },
            markDefs[] {
              _type == 'link' => {
                href
              }
            }
          },
          _type == 'string' => {
            text
          }
        }
      }
    }
  }
`

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  slug,
  content[]{
    ...,
    _type == 'image' => {
      ...,
      asset->{
        _id,
        url
      }
    }
  },
  excerpt,
  coverImage{
    asset->{
      _id,
      url
    },
    alt
  },
  date,
  author->{
    name,
    picture{
      asset->{
        _id,
        url
      },
      alt
    }
  }
}`

export const allPostsQuery = groq`
*[_type == "post"] {
  title,
  slug {
    current
  },
  excerpt,
  coverImage {
    asset->{
      url
    },
    alt
  },
  date,
  author->{
    name,
    picture{
      asset->{
        url
      },
      alt
    }
  }
}
`
