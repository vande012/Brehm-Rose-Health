import { HomeIcon, ImageIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your personal website.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and the personal website subheader.',
      title: 'Description',
      type: 'array',
      of: [
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
            decorators: [
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Strong',
                value: 'strong',
              },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'string',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          icon: ImageIcon,
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for screen readers.',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        defineField({
          name: 'optionalText',
          title: 'Optional Text',
          type: 'text',
        }),
        defineField({
          name: 'buttons',
          title: 'Buttons',
          type: 'array',
          of: [
            defineField({
              name: 'button',
              title: 'Button',
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Text',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
          ],
          options: {
            layout: 'grid',
          },
        }),
      ],
    }),
    defineField({
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
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Alternative text for screen readers.',
                },
                {
                  name: 'url',
                  title: 'Image URL',
                  type: 'string',
                  description: 'The URL of the image.',
                },
              ],
            },
          ],
        }),
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          description: 'Enter a background color in hex format (e.g., #ffffff for white)',
          validation: (Rule) =>
            Rule.regex(/^#([0-9a-fA-F]{3}){1,2}$/).warning('Must be a valid hex color code'),
        }),
      ],
    }),
    defineField({
      name: 'servicesSection',
      title: 'Services Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'services',
          title: 'Services',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Service Image',
                  type: 'image',
                  options: { hotspot: true },
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'title',
                  title: 'Service Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Service Description',
                  type: 'text',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'buttonText',
                  title: 'Button Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'buttonUrl',
                  title: 'Button URL',
                  type: 'url',
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Home',
        title,
      };
    },
  },
});
