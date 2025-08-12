// /sanity/schemas/project.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'hero',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [{type: 'reference', to: {type: 'projectCategory'}}],
    }),
    defineField({
      name: 'tool',
      title: 'Tools Used',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tool'}}],
    }),
    defineField({
      name: 'myRole',
      title: 'My Role',
      type: 'array',
      of: [{type: 'reference', to: {type: 'role'}}],
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'painpoint',
      title: 'Painpoint',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}]},
          ],
        },
      ],
    }),
    defineField({
      name: 'strategy',
      title: 'Strategy',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}]},
          ],
        },
      ],
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}]},
          ],
        },
      ],
    }),
    defineField({
      name: 'result',
      title: 'Result',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'color',
      title: 'Brand / Theme Color',
      type: 'string',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Project',
      type: 'boolean',
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Project Website',
      type: 'url',
    }),
    defineField({
      name: 'emoji',
      title: 'Transition emoji',
      type: 'string',
    }),
    defineField({
      name: 'nextProject',
      title: 'Next Project',
      type: 'array',
      of: [{type: 'reference', to: {type: 'project'}}],
    }),
  ],
})
