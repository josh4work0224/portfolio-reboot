import {defineType} from 'sanity'

export default defineType({
  name: 'role',
  title: 'My Role',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Role Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
})
