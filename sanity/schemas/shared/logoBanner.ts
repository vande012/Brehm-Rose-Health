import { defineField, defineType } from 'sanity';

export const logoBanner = defineField({
  name: 'logoBanner',
  title: 'Logo Banner',
  type: 'object',
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'string',
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, // Enable hotspot for each image
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for screen readers.',
            }),
            defineField({
              name: 'url',
              title: 'Image URL',
              type: 'url',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      validation: (rule) => rule.regex(/^#([0-9a-fA-F]{3}){1,2}$/).warning('Must be a valid hex color code'),
    }),
  ],
});

export default logoBanner;
