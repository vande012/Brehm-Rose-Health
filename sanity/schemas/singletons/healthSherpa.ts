import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export default defineType({
  name: 'externalLink',
  title: 'External Link',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Link',
        subtitle: subtitle || 'No URL set',
        media: LinkIcon,
      }
    },
  },
})
