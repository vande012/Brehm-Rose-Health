import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
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
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        // Add other custom Portable Text types if needed
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true, // Enables the hotspot feature
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }], // Assuming you have an 'author' schema
      validation: Rule => Rule.required(),
    }),
  ],
});

