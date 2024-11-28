import { getApolloClient } from 'lib/apollo-client';

import { QUERY_ALL_CATEGORIES, QUERY_CATEGORY_BY_SLUG, QUERY_CATEGORY_SEO_BY_SLUG } from 'data/categories';

/**
 * categoryPathBySlug
 */

export function categoryPathBySlug(slug) {
  console.log(`[categoryPathBySlug] slug: ${slug}`);
  return `/categories/${slug}`;
}

/**
 * getAllCategories
 */

export async function getAllCategories() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_CATEGORIES,
  });

  const categories = data?.data.categories.edges.map(({ node = {} }) => node);

  return {
    categories,
  };
}

/**
 * getPaginatedCategories
 */

export async function getPaginatedCategories({ currentPage = 1, categoriesPerPage = 10 }) {
  const apolloClient = getApolloClient();

  try {
    const offset = (currentPage - 1) * categoriesPerPage;

    const { data } = await apolloClient.query({
      query: QUERY_ALL_CATEGORIES,
      variables: {
        first: categoriesPerPage,
        offset: offset,
      },
    });

    const categories = data?.categories?.edges.map(({ node }) => node) || [];
    const totalCategories = data?.categories?.totalCount || 0;

    return {
      categories,
      pagination: {
        currentPage,
        pagesCount: Math.ceil(totalCategories / categoriesPerPage),
      },
    };
  } catch (error) {
    console.error(`[getPaginatedCategories] Failed to fetch paginated categories: ${error.message}`);
    return {
      categories: [],
      pagination: {
        currentPage,
        pagesCount: 0,
      },
    };
  }
}
/**
 * getCategoryBySlug
 */

export async function getCategoryBySlug(slug) {
  const apolloClient = getApolloClient();
  const apiHost = new URL(process.env.WORDPRESS_GRAPHQL_ENDPOINT).host;

  let categoryData;
  let seoData;

  try {
    categoryData = await apolloClient.query({
      query: QUERY_CATEGORY_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (e) {
    console.log(`[categories][getCategoryBySlug] Failed to query category data: ${e.message}`);
    throw e;
  }

  if (!categoryData?.data.category) return { category: undefined };

  const category = mapCategoryData(categoryData?.data.category);

  // If the SEO plugin is enabled, look up the data
  // and apply it to the default settings

  if (process.env.WORDPRESS_PLUGIN_SEO === true) {
    try {
      seoData = await apolloClient.query({
        query: QUERY_CATEGORY_SEO_BY_SLUG,
        variables: {
          slug,
        },
      });
    } catch (e) {
      console.log(`[categories][getCategoryBySlug] Failed to query SEO plugin: ${e.message}`);
      console.log('Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.');
      throw e;
    }

    const { seo = {} } = seoData?.data?.category || {};

    category.title = seo.title;
    category.description = seo.metaDesc;

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      category.canonical = seo.canonical;
    }

    category.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    };

    category.article = {
      author: category.og.author,
      modifiedTime: category.og.modifiedTime,
      publishedTime: category.og.publishedTime,
      publisher: category.og.publisher,
    };

    category.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    };

    category.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    };
  }

  return {
    category,
  };
}

/**
 * getCategories with Pagination
 */

export async function getCategories({ count, page = 1 } = {}) {
  const { categories } = await getAllCategories();

  // Paginate the categories, 10 per page
  const startIndex = (page - 1) * count;
  const endIndex = startIndex + count;
  const paginatedCategories = categories.slice(startIndex, endIndex);

  return {
    categories: paginatedCategories,
    totalCategories: categories.length,
    totalPages: Math.ceil(categories.length / count),
    currentPage: page,
  };
}

/**
 * mapCategoryData
 */

export function mapCategoryData(category = {}) {
  const data = { ...category };
  return data;
}
