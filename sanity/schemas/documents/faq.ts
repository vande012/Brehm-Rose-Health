import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineField({
          name: 'section',
          title: 'Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'questions',
              title: 'Questions',
              type: 'array',
              of: [
                defineField({
                  name: 'question',
                  title: 'Question',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'question',
                      title: 'Question',
                      type: 'string',
                    }),
                    defineField({
                      name: 'answer',
                      title: 'Answer',
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
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

