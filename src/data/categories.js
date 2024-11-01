import { gql } from '@apollo/client';
export const QUERY_ALL_CATEGORIES = gql`
  query AllCategories {
    categories(first: 10000) {
      edges {
        node {
          databaseId
          description
          id
          name
          slug
        }
      }
    }
  }
`;

export const QUERY_CATEGORY_BY_SLUG = gql`
  query CategoryBySlug($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      databaseId
      description
      id
      name
      slug
    }
  }
`;

export const QUERY_CATEGORY_SEO_BY_SLUG = gql`
  query CategorySEOBySlug($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      id
      seo {
        canonical
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        opengraphModifiedTime
        opengraphPublishedTime
        opengraphPublisher
        opengraphTitle
        opengraphType
        title
        twitterDescription
        twitterTitle
        twitterImage {
          altText
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
        opengraphImage {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
`;


// pegar posts de acordo com mês e ano
export const QUERY_POSTS_MONTHS = gql`
  query AllPostsIndex($before: String!, $after: String!) {
    posts(
      where: {
        categoryName: "Diário Oficial | 2024"
        orderby: { field: DATE, order: DESC }
        dateQuery: {
          after: $after # Variável "after"
          before: $before # Variável "before"
          inclusive: true
        }
      }
      first: 50
    ) {
      nodes {
        title
        excerpt
        date
      }
    }
  }
`;