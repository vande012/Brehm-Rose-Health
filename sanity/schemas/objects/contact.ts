import { defineField, defineType } from "sanity";

//stores form submission in sanity
export default defineType({
    name: 'contact',
    type: 'document',
    title: 'Contact Form Submissions',
    fields: [
        defineField({
        name: 'name',
        type: 'string',
        title: 'Name',
        validation: Rule => Rule.required(),
      }),
      defineField({
        name: 'email',
        type: 'string',
        title: 'Email',
        validation: Rule => Rule.required().email(),
        }),
        defineField({
            name: 'phone',
            type: 'string',
            title: 'Phone Number',
            validation: Rule => Rule.required().regex(/^\+\d{1,2}\s\d{3,4}\s\d{3,4}\s\d{4}$/),
          }),
        defineField({
            name: 'type',
            title: 'Type',
            type: 'array',
            of: [
              {
                type: 'string',
                title: 'Contact Type',
                options: {
                  list: [
                    { title: "Short Term Coverage", value: "Short Term Coverage" },
                    { title: "Group Coverage", value: "Group Coverage" },
                    { title: "Personal Coverage", value: "Personal Coverage" },
                  ],
                  layout: 'radio',
                },
              },
            ],
            validation: Rule => Rule.required(),
          }),
      defineField({
        name: 'message',
        type: 'text',
        title: 'Message',
        validation: Rule => Rule.required(),
        }),
    ],
  });
