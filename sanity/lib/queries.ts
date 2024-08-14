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

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
    
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
