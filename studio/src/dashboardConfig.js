export default {
  widgets: [
    { name: "structure-menu" },
    {
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description:
                "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
              sites: [
                {
                  buildHookId:
                    "630c6c54fbefa96d1cc710d3",
                  title: "Sanity Studio",
                  name: "sanity-gatsby-blog-studio-sqryk7kv",
                  apiId: "0ebdc0ce-526e-4681-aff5-26810ac78d46",
                },
                {
                  buildHookId: "630c6c54a75f7a75ad21c95d",
                  title: "Blog Website",
                  name: "sanity-gatsby-blog-web-qaf8ryqm",
                  apiId: "c2f3b9cd-1703-4edd-a1a2-b0999c591e33",
                },
              ],
            },
          },
        ],
        data: [
          {
            title: "GitHub repo",
            value:
              "https://github.com/ckvgemmy/sanity-gatsby-blog",
            category: "Code",
          },
          {
            title: "Frontend",
            value: "https://sanity-gatsby-blog-web-qaf8ryqm.netlify.app",
            category: "apps",
          },
        ],
      },
    },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "document-list",
      options: {
        title: "Recent blog posts",
        order: "_createdAt desc",
        types: ["post"],
      },
      layout: { width: "medium" },
    },
  ],
};
