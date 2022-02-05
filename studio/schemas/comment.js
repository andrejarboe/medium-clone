export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
        title: 'Approved',
        name:"approved",
        type: 'boolean',
        description: 'Approve comment to be visible on the website. (You still have to publish the post to make it visible to the public.)',
    },
    {
        name: 'email',
        type: 'string',
    },
    {
        name: 'comment',
        type: 'text',
    },
    {
        name: 'post',
        type: 'reference',
        to: [{type: 'post'}],
    }
  ],
}
