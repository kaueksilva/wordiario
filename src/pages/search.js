// Remova 'use client'; do topo do arquivo
import { Helmet } from 'react-helmet';
import usePageMetadata from 'hooks/use-page-metadata';
import TemplateArchive from 'templates/archive';
import { parse, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function SearchResultsPage({ results, query }) {
  const title = 'Search';
  const slug = 'search';
  const content = 'search';
  const excerpt = 'search';
  const date = 'search';

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      content,
      excerpt,
      date,
      description: `Resultados da busca por ${query}`,
    },
  });

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <br />
      <br />
      <br />
      {results.length > 0 ? (
        <TemplateArchive title={title} posts={results} slug={slug} excerpt={content} metadata={metadata} date={date} />
      ) : (
        <p>Nenhum resultado encontrado para &apos;{query}&apos;.</p>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { q } = context.query;

  if (!q) {
    return {
      props: {
        results: [],
        query: '',
      },
    };
  }

  try {
    const res = await fetch(
      `https://diariooficial.jaboatao.pe.gov.br/wp-json/custom-api/v1/search/?query=${encodeURIComponent(q)}`
    );
    const data = await res.json();

    const results = data?.data
      ? data.data.map((post) => {
          const content = post.content ? post.content.replace(/(<([^>]+)>)/g, '').trim() : '';
          const excerpt = post.excerpt
            ? post.excerpt.replace(/(<([^>]+)>)/g, '').trim()
            : content.substring(0, 200) + '...';

          // Parsear e formatar a data
          let date = post.date || '';
          if (date) {
            date = date.trim().replace(/\s+/g, ' '); // Limpa espaços extras
            try {
              const parsedDate = parse(date, "d 'de' MMMM 'de' yyyy", new Date(), { locale: ptBR });
              date = format(parsedDate, 'yyyy-MM-dd');
            } catch (error) {
              console.error('Erro ao parsear a data:', date, error);
              date = ''; // Define como string vazia se houver erro
            }
          }

          return {
            title: post.title || '',
            content,
            excerpt,
            databaseId: post.id || '',
            date,
            modified: null,
            slug: post.slug || '',
            categories: post.categories || [],
          };
        })
      : [];

    return {
      props: {
        results,
        query: q,
      },
    };
  } catch (error) {
    console.error('Erro ao buscar resultados:', error);
    return {
      props: {
        results: [],
        query: q,
      },
    };
  }
}
