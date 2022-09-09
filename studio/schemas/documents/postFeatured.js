export  default {
  name: 'postFeatured',
  title: 'Featured Post ',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: "excerpt",
      type: "excerptPortableText",
      title: "Excerpt",
      description:
        "This ends up on summary pages, on Google, when people share your post in social media.",
    },
    {
      name: "mainImage",
      type: "mainImage",
      title: "Main image",
    }
  ]
}
