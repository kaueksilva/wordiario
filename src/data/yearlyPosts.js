import { gql } from '@apollo/client';
import { getApolloClient } from 'lib/apollo-client';
// Função para obter os posts por mês
export async function getpostsPerMonth(before = { year: 2024, month: 3, day: 1 }, after = { year: 2024, month: 1, day: 31 }
) {
  try {
    const apolloClient = getApolloClient();

    // Faz a consulta GraphQL passando as variáveis
    const { data } = await apolloClient.query({
      query: QUERY_POSTS_MONTHS,
      variables: {
        before, // Passa o valor de "before" como DateInput
        after, // Passa o valor de "after" como DateInput
      },
    });

    console.log('Sucesso! dados:, data');
    return {
      data,
    };
  } catch (e) {
    console.log('O erro é o seguinte: ' + e);
    return e;
  }
}

// Query GraphQL com uso de variáveis ($before, $after) como DateInput
export const QUERY_POSTS_MONTHS = gql`
  query AllPostsIndex($before: DateInput!, $after: DateInput!) {
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

// ANO 2015

export const POSTS_2015 = gql`
  query AllPostsIndex($before: DateInput!, $after: DateInput!) {
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

export const POSTS_2016 = gql`
query AllPostsIndex {
  posts(
    where: {
      categoryIn: [18],
      orderby: {field: DATE, order: DESC},
      dateQuery: {
        year: 2016,
        month: 12,
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

export const POSTS_2017 = gql`query AllPostsIndex {
  posts(
    where: {
      categoryIn: [24],
      orderby: {field: DATE, order: DESC},
      dateQuery: {
        year: 2017,
        month: 12,
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
}` 

export const POSTS_2018 = gql`query AllPostsIndex {
  posts(
    where: {
      categoryIn: [26],
      orderby: {field: DATE, order: DESC},
      dateQuery: {
        year: 2018,
        month: 12, 
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
}`

export const POSTS_2019 = gql`query AllPostsIndex {
  posts(
    where: {
      categoryIn: [29, 30],
      orderby: {field: DATE, order: DESC},
      dateQuery: {
        year: 2019,
        month: 1,
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
}`

export const POSTS_2020 = gql`query AllPostsIndex {
  posts(
    where: {
      categoryIn: [46, 31, 33],
      orderby: {field: DATE, order: DESC},
      dateQuery: {
        year: 2020,
        month: 6,
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
}`

export const POSTS_2021 = gql`query AllPostsIndex {
  posts(
    where: {
      categoryIn: [34, 36],
      orderby: {field: DATE, order: DESC},
      dateQuery: {
        year: 2021,
        month: 12,
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
}`;

export const POSTS_2022 = gql `query AllPostsIndex {
  posts(
    where: {
      categoryIn: [37],
      orderby: {field: DATE, order: DESC},
      dateQuery: {
        year: 2022,
        month: 1,
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
}`;

export const POSTS_2023 = gql `query AllPostsIndex {
  posts(
    where: {
      categoryIn: [39],
      orderby: {field: DATE, order: DESC},
      dateQuery: {
        year: 2023,
        month: 12,
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
}`;

export const POSTS_2024 = gql `query AllPostsIndex {
  posts(
    where: {
      categoryIn: [8],
      orderby: {field: DATE, order: DESC},
      dateQuery: {
        year: 2024,
        month: 10,
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
}`