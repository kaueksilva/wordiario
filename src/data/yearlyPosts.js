import { gql } from '@apollo/client';
import { getApolloClient } from 'lib/apollo-client';

// Função para obter os posts por mês
export async function getpostsPerMonth(
  before = { year: 2024, month: 3, day: 1 },
  after = { year: 2024, month: 1, day: 31 }
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

    console.log(`Sucesso! dados:`, data);
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
