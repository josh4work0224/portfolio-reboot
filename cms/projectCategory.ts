import {defineType} from 'sanity'

export default defineType({
  name: 'projectCategory',
  title: 'Project Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string', // 或自訂色彩選擇器
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
})
