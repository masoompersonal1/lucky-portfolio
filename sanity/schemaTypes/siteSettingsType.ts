import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
    }),
  ],
})
