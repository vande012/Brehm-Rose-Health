import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    showcaseProjects[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
    hero { // Include the hero section
      heading,
      subheading,
      image {
        asset->{
          _id,
          url
        },
        alt
      },
      optionalText,
      buttons[]{
        text,
        url
      }
    },
    logoBanner {
      header,
      logos[] {
        asset->{
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
  }
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
    hero { // Include the hero section
      heading,
      subheading,
      image {
        asset->{
          _id,
          url
        },
        alt
      },
      optionalText,
      buttons[]{
        text,
        url
      }
    },
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
    title,
    
  }
`


export const sitemapQuery = groq`
{
  // Fetch the homepage slug
  "homePages": *[_type == "home"][0]{
    "slug": "/"
  },
  
  // Fetch all pages with slugs
  "pages": *[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  },
}
`;
export const servicesSectionQuery = groq`
  *[_type == "home"][0]{
    servicesSection {
      title,
      services[] {
        image {
          asset->{
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
    }
  }
`;