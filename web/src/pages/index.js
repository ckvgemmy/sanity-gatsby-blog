import {useEffect, useState} from "react";
import React from "react";
import { graphql } from "gatsby";
import {
  filterOutDocsPublishedInTheFuture,
  filterOutDocsWithoutSlugs,
  mapEdgesToNodes,
} from "../lib/helpers";
import BlogPostPreviewList from "../components/blog-post-preview-list";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import sanityClient from "@sanity/client";

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    posts: allSanityPost(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...SanityImage
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

const client = sanityClient({
  projectId: "w2bhjevw",
  dataset: "production",
  useCdn: true
});

// const endpoint = "https://w2bhjevw.api.sanity.io/v1/graphql/production/default";
/*const FEATURED_QUERY = `
  allSanityPostFeatured {
    edges {
      node {
        title
      }
    }
  }
`;*/

const FEATURED_QUERY = encodeURIComponent('*[_type == "postFeatured"]{title}')
const endpoint = `https://w2bhjevw.api.sanity.io/v1/data/query/production?query=${FEATURED_QUERY}`;

const IndexPage =   function(props) {
  /*const { dataFeatured, isLoading, error } = useQuery("allSanityPostFeatured", () => {
    return fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: FEATURED_QUERY })
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Error fetching data");
        } else {
          return response.json();
        }
      })
      .then((dataFeatured) => dataFeatured.data);
  });*/

  /*const { dataFeatured, isLoading, error } = useQuery("launches", () => {
    return request(endpoint, FEATURED_QUERY);
  });

  console.log(dataFeatured)*/
/*  const fetcher = (args) => fetch(...args).then(res => res.json())
  const { dataFeatured, error } = useSWR(endpoint, fetcher);*/
  const [featuredData, setFeaturedData] = useState(0);

  useEffect(() => {
    async function getData() {
      const result = await Promise.resolve(fetch(endpoint).then(res => res.json()));
      setFeaturedData(result);
    }
    getData();
  }, []);

  console.log(featuredData.result)
  const { data, errors } =  props;
  console.log(data)

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      {featuredData && featuredData.result.map(d => {
        return <div>{d.title}</div>
      })}
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        {postNodes && (
          <BlogPostPreviewList
            title="Latest blog posts"
            nodes={postNodes}
            browseMoreHref="/archive/"
          />
        )}
      </Container>
    </Layout>
  )
}

export default IndexPage
