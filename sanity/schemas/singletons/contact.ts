import {ClipboardIcon} from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  icon: ClipboardIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
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
      validation: rule => rule.max(155).required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: rule =>
        rule
          .required()
          .regex(
            /^[\p{L}0-9]+(?:\.[\p{L}0-9]+)*@(?:[\p{L}0-9](?:[\p{L}0-9-]*[\p{L}0-9])?\.)+[\p{L}0-9](?:[\p{L}0-9-]*[\p{L}0-9])?$/u,
            {
              name: 'email',
              invert: true,
            }
          ),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Contact',
        title,
      };
    },
  },
});

