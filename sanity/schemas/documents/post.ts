import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentIcon, ImageIcon } from '@sanity/icons'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            decorators: [{ title: 'Strong', value: 'strong' }],
            annotations: [
              {
                name: 'link',
                type: 'object',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                  { name: 'title', type: 'string', title: 'Title' },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        // Add other custom Portable Text types if needed
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt - Used for the <meta> description tag for SEO',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      icon: ImageIcon,
      options: {
        hotspot: true, // Enables the hotspot feature
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for screen readers.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }], // Assuming you have an 'author' schema
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
    prepare({ title, media }) {
      return {
        title,
        media,
      }
    },
  },
})
