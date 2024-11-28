// /**
//  * Função para buscar dados da API.
//  */
// export async function getSearchData(query) {
//   const apiBaseUrl = `https://diariooficial.jaboatao.pe.gov.br/wp-json/custom-api/v1/search/`;

//   const searchTerm = query;

//   try {
//     // Chama a função para obter os posts
//     const response = await getAllPostsAscRestApi(apiBaseUrl, searchTerm, 'FetchPosts', true);

//     // Aqui não é necessário verificar `response.ok`, porque o retorno já é o esperado
//     // Se o retorno da API for bem sucedido, o formato esperado é `{ posts: [] }`
//     if (!response || !response.posts || response.posts.length === 0) {
//       throw new Error(`Nenhum dado encontrado na API.`);
//     }

//     console.log('Resposta da API:', response);

//     // Retorna o resultado já processado
//     return response; // Retorna o objeto com posts

//   } catch (error) {
//     console.error("Erro ao buscar dados da API:", error);
//     throw error;
//   }
// }

// /**
//  * Função para fazer a requisição e obter os posts
//  */
// async function getAllPostsAscRestApi(apiBaseUrl, searchTerm, process, verbose = false) {
//   let posts = [];

//   try {
//     // Constrói a URL com o parâmetro de busca
//     const apiUrl = `${apiBaseUrl}?query=${encodeURIComponent(searchTerm)}`;

//     // Faz a requisição à API REST
//     const response = await fetch(apiUrl);

//     // Log para entender o que a API está retornando
//     if (!response.ok) {
//       throw new Error(`Erro ao consumir API: ${response.statusText}`);
//     }

//     // Log do conteúdo da resposta para depuração
//     const data = await response.json();
//     console.log('Resposta da API:', data); // Aqui você pode ver o conteúdo retornado pela API

//     // Verifica se os dados existem e faz o mapeamento
//     posts = data.data.map((post) => {
//       const formattedPost = {
//         title: post.title || '',
//         content: post.content
//           ? post.content.replace(/(<([^>]+)>)/g, '').trim() // Remove HTML
//           : '',
//         excerpt: post.excerpt || '',
//         databaseId: post.id || '',
//         date: post.date || '',
//         modified: null, // Adicione outros campos como necessário
//         slug: post.slug || null, // Garantir que o slug esteja presente, se disponível
//         categories: post.categories || [], // Se categorias não existirem, já inicializa como vazio
//       };
//       return formattedPost;
//     });

//     verbose && console.log(`[${process}] Successfully fetched posts from ${apiUrl}`);
//     return {
//       posts,
//     };
//   } catch (e) {
//     throw new Error(`[${process}] Failed to fetch posts from ${apiBaseUrl}: ${e.message}`);
//   }
// }

import he from 'he'; // Certifique-se de ter essa biblioteca instalada para decodificar HTML entities

/**
 * Função para buscar dados da API e gerar um índice de busca.
 */
export async function getSearchData(query) {
  const apiBaseUrl = `https://diariooficial.jaboatao.pe.gov.br/wp-json/custom-api/v1/search/`;

  const searchTerm = query;

  try {
    // Chama a função para obter os posts
    const response = await getAllPostsAscRestApi(apiBaseUrl, searchTerm, 'FetchPosts', true);

    if (!response || !response.posts || response.posts.length === 0) {
      throw new Error(`Nenhum dado encontrado na API.`);
    }

    console.log('Resposta da API:', response);

    // Gera o índice de busca com os posts
    const searchIndex = generateIndexSearchWithPosts(response);

    // Retorna o índice gerado
    return searchIndex;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw error;
  }
}

/**
 * Função para fazer a requisição e obter os posts.
 */
async function getAllPostsAscRestApi(apiBaseUrl, searchTerm, process, verbose = false) {
  let posts = [];

  try {
    // Constrói a URL com o parâmetro de busca
    const apiUrl = `${apiBaseUrl}?query=${encodeURIComponent(searchTerm)}`;

    // Faz a requisição à API REST
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Erro ao consumir API: ${response.statusText}`);
    }

    // Obtém os dados da resposta
    const data = await response.json();
    console.log('Resposta da API:', data);

    // Formata os dados retornados
    posts = data.data.map((post) => {
      return {
        title: post.title || '',
        content: post.content
          ? post.content.replace(/(<([^>]+)>)/g, '').trim() // Remove HTML
          : '',
        excerpt: post.excerpt || '',
        databaseId: post.id || '',
        date: post.date || '',
        modified: null,
        slug: post.slug || null,
        categories: post.categories || [],
      };
    });

    verbose && console.log(`[${process}] Successfully fetched posts from ${apiUrl}`);
    return { posts };
  } catch (e) {
    throw new Error(`[${process}] Failed to fetch posts from ${apiBaseUrl}: ${e.message}`);
  }
}

/**
 * Função para gerar um índice de busca com os posts.
 */
function generateIndexSearchWithPosts({ posts }) {
  const index = posts.map((post = {}) => {
    const title = he.decode(post.title);
    const excerpt = post.excerpt ? he.decode(post.excerpt) : '';
    const content = post.content ? he.decode(post.content) : '';

    const allCategories = post.categories.map((category) => ({
      name: category.name ? he.decode(category.name) : '',
      description: category.description ? he.decode(category.description) : '',
    }));

    return {
      title,
      slug: post.slug,
      date: post.date,
      excerpt,
      categories: post.categories,
      allCategories,
      content,
    };
  });

  const indexJson = JSON.stringify({
    generated: Date.now(),
    posts: index,
  });

  return indexJson;
}
