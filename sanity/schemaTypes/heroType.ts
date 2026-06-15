import { defineField, defineType } from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'topSubheading',
      title: 'Top Subheading',
      type: 'string',
      description: 'The small text above the main title (e.g. VISUAL STORYTELLER)',
    }),
    defineField({
      name: 'mainTitle',
      title: 'Main Title',
      type: 'string',
      description: 'The large bold text (e.g. FRAMEUP)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'signature',
      title: 'Signature Text',
      type: 'string',
      description: 'The text written in cursive/signature font',
    }),
    defineField({
      name: 'signatureSubtext',
      title: 'Signature Subtext',
      type: 'string',
      description: 'The small text under the signature',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
  ],
})
