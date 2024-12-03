const fs = require('fs');
const he = require('he');
const { gql, ApolloClient, InMemoryCache } = require('@apollo/client');
const RSS = require('rss');
const prettier = require('prettier');

const config = require('../package.json');

/**
 * createFile
 */

async function createFile(file, process, directory, location, verbose = false) {
  try {
    mkdirp(directory);
    verbose && console.log(`[${process}] Created directory ${directory}`);
    await promiseToWriteFile(location, file);
    verbose && console.log(`[${process}] Successfully wrote file to ${location}`);
  } catch (e) {
    throw new Error(`[${process}] Failed to create file: ${e.message}`);
  }
}

/**
 * promiseToWriteFile
 */

function promiseToWriteFile(location, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(location, content, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

/**
 * mkdirp
 */

function mkdirp(directory) {
  const split = directory.split('/');
  let temp = '.';

  split.forEach((dir) => {
    temp = `${temp}/${dir}`;

    if (!fs.existsSync(temp)) {
      fs.mkdirSync(temp);
    }
  });
}

/**
 * createApolloClient
 */

function createApolloClient(url) {
  return new ApolloClient({
    uri: url,
    cache: new InMemoryCache(),
  });
}

/**
 * getAllPosts -> Esta função busca todas as portagens começando da ultima publicação do ano atual para o utimo ano, formata e limpa o conteúdo,
 * e retorna uma lista organizada com apenas os dados relevantes e simpplificados para serem usados no frontend
 * ou em outro parte da aplicação.
 */

async function getAllPosts(apolloClient, process, verbose = false) {
  const query = gql`
    {
      posts(first: 10000, where: {dateQuery: {inclusive: false}) {
        edges {
          node {
            title
            excerpt
            databaseId
            slug
            date
            modified
            content
            author {
              node {
                name
              }
            }
            categories {
              edges {
                node {
                  name
                  description
                }
              }
            }
          }
        }
      }
    }
  `;

  let posts = [];

  try {
    const data = await apolloClient.query({ query });
    const nodes = [...data.data.posts.edges.map(({ node = {} }) => node)];

    posts = nodes.map((post) => {
      const data = { ...post };

      if (data.author) {
        data.author = data.author.node.name;
      }

      if (data.categories) {
        data.categories = data.categories.edges.map(({ node }) => node.name);
      }

      if (data.excerpt) {
        //Limpe o trecho removendo todas as tags HTML
        const regExHtmlTags = /(<([^>]+)>)/g;
        data.excerpt = data.excerpt.replace(regExHtmlTags, '');
      }
      if (data.content) {
        //Limpe o trecho removendo todas as tags HTML
        const regExHtmlTags = /(<([^>]+)>)/g;
        data.content = data.content.replace(regExHtmlTags, '').trim();
      }

      return data;
    });

    verbose && console.log(`[${process}] Successfully fetched posts from ${apolloClient.link.options.uri}`);
    return {
      posts,
    };
  } catch (e) {
    throw new Error(`[${process}] Failed to fetch posts from ${apolloClient.link.options.uri}: ${e.message}`);
  }
}
/**
 * getAllPosts -> Esta função busca todas as portagens começando da ultima publicação do ano utimo ano para o ano atual,
 * formata e limpa o conteúdo, e retorna uma lista organizada com apenas os dados relevantes e simpplificados
 * para serem usados no frontend ou em outro parte da aplicação.
 */

async function getAllPostsAsc(apolloClient, process, verbose = false) {
  const query = gql`
    {
      posts(last: 10000, where: {dateQuery: {inclusive: false}) {
        edges {
          node {
            title
            excerpt
            databaseId
            slug
            date
            modified
            content
            author {
              node {
                name
              }
            }
            categories {
              edges {
                node {
                  name
                  description
                }
              }
            }
          }
        }
      }
    }
  `;

  let posts = [];

  try {
    const data = await apolloClient.query({ query });
    const nodes = [...data.data.posts.edges.map(({ node = {} }) => node)];

    posts = nodes.map((post) => {
      const data = { ...post };

      if (data.author) {
        data.author = data.author.node.name;
      }

      if (data.categories) {
        data.categories = data.categories.edges.map(({ node }) => node.name);
      }

      if (data.excerpt) {
        //Limpe o trecho removendo todas as tags HTML
        const regExHtmlTags = /(<([^>]+)>)/g;
        data.excerpt = data.excerpt.replace(regExHtmlTags, '');
      }
      if (data.content) {
        //Limpe o trecho removendo todas as tags HTML
        const regExHtmlTags = /(<([^>]+)>)/g;
        data.content = data.content.replace(regExHtmlTags, '').trim();
      }

      return data;
    });

    verbose && console.log(`[${process}] Successfully fetched posts from ${apolloClient.link.options.uri}`);
    return {
      posts,
    };
  } catch (e) {
    throw new Error(`[${process}] Failed to fetch posts from ${apolloClient.link.options.uri}: ${e.message}`);
  }
}
/**
 * getSiteMetadata
 */

async function getSiteMetadata(apolloClient, process, verbose = false) {
  const query = gql`
    {
      generalSettings {
        description
        language
        title
      }
    }
  `;

  let metadata = {};

  try {
    const data = await apolloClient.query({ query });
    metadata = { ...data.data.generalSettings };

    if (!metadata.language || metadata.language === '') {
      metadata.language = 'en';
    } else {
      metadata.language = metadata.language.split('_')[0];
    }

    verbose && console.log(`[${process}] Successfully fetched metadata from ${apolloClient.link.options.uri}`);
    return {
      metadata,
    };
  } catch (e) {
    throw new Error(`[${process}] Failed to fetch metadata from ${apolloClient.link.options.uri}: ${e.message}`);
  }
}

/**
 * getSitePages
 */

async function getPages(apolloClient, process, verbose = false) {
  const query = gql`
    {
      pages(first: 10000) {
        edges {
          node {
            slug
            modified
          }
        }
      }
    }
  `;

  let pages = [];

  try {
    const data = await apolloClient.query({ query });
    pages = [
      ...data.data.pages.edges.map(({ node = {} }) => {
        return {
          slug: node.slug,
          modified: node.modified,
        };
      }),
    ];

    verbose && console.log(`[${process}] Successfully fetched page slugs from ${apolloClient.link.options.uri}`);
    return {
      pages,
    };
  } catch (e) {
    throw new Error(`[${process}] Failed to fetch page slugs from ${apolloClient.link.options.uri}: ${e.message}`);
  }
}

/**
 * getFeedData
 */

async function getFeedData(apolloClient, process, verbose = false) {
  const metadata = await getSiteMetadata(apolloClient, process, verbose);
  const posts = await getAllPosts(apolloClient, process, verbose);
  const postsAsc = await getAllPostsAsc(apolloClient, process, verbose);

  return {
    ...metadata,
    ...posts,
    ...postsAsc,
  };
}

/**
 * getFeedData
 */

async function getSitemapData(apolloClient, process, verbose = false) {
  const posts = await getAllPosts(apolloClient, process, verbose);
  const postsAsc = await getAllPostsAsc(apolloClient, process, verbose);
  const pages = await getPages(apolloClient, process, verbose);

  return {
    ...posts,
    ...postsAsc,
    ...pages,
  };
}

/**
 * generateFeed
 */

function generateFeed({ posts = [], metadata = {} }) {
  const { homepage = '' } = config;

  const feed = new RSS({
    title: metadata.title || '',
    description: metadata.description,
    site_url: homepage,
    feed_url: `${homepage}/feed.xml`,
    copyright: `${new Date().getFullYear()} ${metadata.title}`,
    language: metadata.language,
    pubDate: new Date(),
  });

  posts.map((post) => {
    feed.item({
      title: post.title,
      guid: `${homepage}/posts/${post.slug}`,
      url: `${homepage}/posts/${post.slug}`,
      date: post.date,
      description: post.excerpt,
      author: post.author,
      categories: post.categories || [],
    });
  });

  return feed.xml({ indent: true });
}
/**
 * generateIndexSearch
 */

// function generateIndexSearchWithPosts({ posts }) {
//   const index = posts.map((post = {}) => {
//     // We need to decode the title because we're using the
//     // rendered version which assumes this value will be used
//     // within the DOM

//     const title = he.decode(post.title);
//     const excerpt = post.excerpt ? he.decode(post.excerpt) : '';
//     const content = post.content ? he.decode(post.content) : '';

//     const allCategories = post.categories
//       ? post.allCategories.map((category) => ({
//           name: category.name ? he.decode(category.name) : '',
//           description: category.description ? he.decode(category.description) : '',
//         }))
//       : [];

//     return {
//       title,
//       slug: post.slug,
//       date: post.date,
//       excerpt,
//       categories: post.categories,
//       allCategories,
//       content,
//     };
//   });

//   const indexJson = JSON.stringify({
//     generated: Date.now(),
//     posts: index,
//   });

//   return indexJson;
// }
/**
 * generateIndexSearch
 */
function generateIndexSearch(postsAsc, postsDesc) {
  const indexAsc = postsAsc.map((post = {}) => ({
    title: he.decode(post.title),
    slug: post.slug,
    date: post.date,
    excerpt: post.excerpt ? he.decode(post.excerpt) : '',
    categories: post.categories,
    content: post.content ? he.decode(post.content) : '',
  }));

  const indexDesc = postsDesc.map((post = {}) => ({
    title: he.decode(post.title),
    slug: post.slug,
    date: post.date,
    excerpt: post.excerpt ? he.decode(post.excerpt) : '',
    categories: post.categories,
    content: post.content ? he.decode(post.content) : '',
  }));

  const indexJson = JSON.stringify({
    generated: Date.now(),
    postsAsc: indexAsc,
    postsDesc: indexDesc,
  });

  return indexJson;
}

/**
 * getSitemapData
 */

function generateSitemap({ posts = [], pages = [] }, nextConfig = {}) {
  const { homepage = '' } = config;
  const { trailingSlash } = nextConfig;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${homepage}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
        ${pages
          .map((page) => {
            return `<url>
                      <loc>${homepage}/${page.slug}${trailingSlash ? '/' : ''}</loc>
                      <priority>0.3</priority>
                      <lastmod>${new Date(page.modified).toISOString()}</lastmod>
                    </url>
                `;
          })
          .join('')}
          ${posts
            .map((post) => {
              return `<url>
                        <loc>${homepage}/posts/${post.slug}${trailingSlash ? '/' : ''}</loc>
                        <lastmod>${new Date(post.modified).toISOString()}</lastmod>
                      </url>
                  `;
            })
            .join('')}
    </urlset>
    `;

  const sitemapFormatted = prettier.format(sitemap, {
    printWidth: 120,
    parser: 'html',
  });

  return sitemapFormatted;
}

/**
 * generateRobotsTxt
 */

async function generateRobotsTxt({ outputDirectory, outputName }) {
  const { homepage = '' } = config;

  try {
    // Build sitemap URL at root directory
    let sitemapUrl = new URL(outputName, homepage);

    // Check if output directory is not root directory
    if (outputDirectory !== './public') {
      // Check if output directory is within './public' folder
      if (outputDirectory.startsWith('./public')) {
        // Update sitemap URL with new directory
        sitemapUrl.pathname = resolvePublicPathname(outputDirectory, outputName);
      } else {
        throw new Error('Sitemap should be within ./public folder.');
      }
    }

    // Robots content using sitemap final URL
    const robots = `User-agent: *\nSitemap: ${sitemapUrl}`;

    // Create robots.txt always at root directory
    await createFile(robots, 'Robots.txt', './public', './public/robots.txt');
  } catch (e) {
    throw new Error(`[Robots.txt] Failed to create robots.txt: ${e.message}`);
  }
}

/**
 * resolvePathname
 */

function resolvePublicPathname(outputDirectory, outputName) {
  const directory = outputDirectory.split('/');
  const index = directory.indexOf('public');
  const path = directory
    .map((path, i) => {
      // If actual folder is a 'public' direct subfolder and is not empty, add to pathname
      if (i > index && path) {
        return `/${path}`;
      }
    })
    .join('');

  return `${path}/${outputName}`;
}

/**
 * removeLastTrailingSlash
 */

function removeLastTrailingSlash(url) {
  if (typeof url !== 'string') return url;
  return url.replace(/\/$/, '');
}

/**
 * terminalColor
 */

function terminalColor(text, level) {
  switch (level) {
    /** green */
    case 'info':
    default:
      return `\x1b[32m${text}\x1b[0m`;
    /** yellow */
    case 'warn':
      return `\x1b[33m${text}\x1b[0m`;
    /** red */
    case 'error':
      return `\x1b[31m${text}\x1b[0m`;
  }
}

module.exports = {
  createFile,
  promiseToWriteFile,
  mkdirp,
  createApolloClient,
  getAllPosts,
  getSiteMetadata,
  getFeedData,
  generateFeed,
  generateIndexSearch,
  getPages,
  getSitemapData,
  generateSitemap,
  generateRobotsTxt,
  removeLastTrailingSlash,
  resolvePublicPathname,
  terminalColor,
};
