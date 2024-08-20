import { defineField, defineType } from 'sanity';

export const servicesSection = defineField({
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
          defineField({
            type: 'object',
            name: 'serviceItem',
            title: 'Service Item',
            fields: [
              defineField({
                name: 'image',
                title: 'Service Image',
                type: 'image',
                options: { hotspot: true },
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'title',
                title: 'Service Title',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'description',
                title: 'Service Description',
                type: 'text',
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'buttonText',
                title: 'Button Text',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'buttonUrl',
                title: 'Button URL',
                type: 'url',
                validation: (Rule) => Rule.required(),
              }),
            ],
          }),
        ],
      }),
    ],
  });
  
  export default servicesSection;
