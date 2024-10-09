import Link from 'next/link';
import { Helmet } from 'react-helmet';

import { getPostBySlug, getRecentPosts, getRelatedPosts, postPathBySlug } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';
import { ArticleJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPrint, faFilePdf } from '@fortawesome/free-solid-svg-icons';

import styles from 'styles/pages/Post.module.scss';

export default function Post({ post, socialImage, related }) {
  const { title, metaTitle, description, content = false } = post;

  const { metadata: siteMetadata = {}, homepage } = useSite();

  if (!post.og) {
    post.og = {};
  }

  post.og.imageUrl = `${homepage}${socialImage}`;
  post.og.imageSecureUrl = post.og.imageUrl;
  post.og.imageWidth = 2000;
  post.og.imageHeight = 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...post,
      title: metaTitle,
      description: description || post.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title}` - `${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const { posts: relatedPostsList, title: relatedPostsTitle } = related || {};

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  // Função para gerar PDF com o conteúdo dinâmico
  // const generatePDF = () => {
  //   const doc = new jsPDF();
  //   doc.setFontSize(16);
  //   doc.text(title, 10, 10); // Adiciona o título do post no PDF

  //   doc.setFontSize(12);
  //   const contentWithoutHTML = content.replace(/(<([^>]+)>)/gi, ''); // Remove as tags HTML
  //   const splitContent = doc.splitTextToSize(contentWithoutHTML, 190); // Divide o texto para caber na página
  //   doc.text(splitContent, 10, 20); // Adiciona o conteúdo no PDF

  //   doc.save('post.pdf'); // Salva o PDF com o nome 'post.pdf'
  // };

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <ArticleJsonLd post={post} siteTitle={siteMetadata.title} />

      <div className="bg-[radial-gradient(circle_at_center,#ffffff,#AFAFAF)] text-white text-4xl font-bold py-8 text-center relative mt-[110px]">
        {/* Títulos e Imagem em Destaque */}
        <div className="flex justify-center items-center mb-4 flex-wrap">
          {/* Renderização do título "DIÁRIO" */}
          <h1 className="text-[40px] font-normal text-[#003476]">DIÁRIO</h1>

          {/* Renderização do título "OFICIAL" */}
          <h1 className="text-[40px] font-normal text-[#003476]">OFICIAL</h1>
        </div>

        {/* Renderização do subtítulo "PODER EXECUTIVO" */}
        <h2 className="text-[15px] font-normal text-[#003476]">PODER EXECUTIVO</h2>
      </div>

      {/* Div para o título principal e metadados */}
      <div className="text-center mt-0">
        {/* Metadados e Título principal dentro da linha azul */}
        <div className="bg-[#224276] text-white text-center py-4">
          {/* Título principal */}
          <h1 className="text-[23px] text-[#ffffff] font-bold" dangerouslySetInnerHTML={{ __html: title }} />
        </div>

        {/* <div className="flex justify-center space-x-4 my-4">
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-2 bg-[#003476] text-white px-4 py-2 rounded hover:bg-[#002355] transition-colors"
            aria-label="Imprimir página"
          >
            <FontAwesomeIcon icon={faPrint} className="mr-2" />
            Imprimir
          </button>
          <button
            onClick={generatePDF}
            className="flex items-center space-x-2 bg-[#003476] text-white px-4 py-2 rounded hover:bg-[#002355] transition-colors"
            aria-label="Gerar PDF"
          >
            <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
            Gerar PDF
          </button>
        </div> */}
      </div>

      <Content>
        <Section>
          <Container>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </Container>
        </Section>
      </Content>

      <Section className={styles.postFooter}>
        <Container>
          {Array.isArray(relatedPostsList) && relatedPostsList.length > 0 && (
            <div className={styles.relatedPosts}>
              {relatedPostsTitle.name ? (
                <span>
                  More from <Link href={relatedPostsTitle.link}>{relatedPostsTitle.name}</Link>
                </span>
              ) : (
                <span>More Posts</span>
              )}
              <ul>
                {relatedPostsList.map((post) => (
                  <li key={post.title}>
                    <Link href={postPathBySlug(post.slug)}>{post.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { post } = await getPostBySlug(params?.slug);

  if (!post) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { categories, databaseId: postId } = post;

  const props = {
    post,
    socialImage: `${process.env.OG_IMAGE_DIRECTORY}` / `${params?.slug}`.png,
  };

  const { category: relatedCategory, posts: relatedPosts } = (await getRelatedPosts(categories, postId)) || {};
  const hasRelated = relatedCategory && Array.isArray(relatedPosts) && relatedPosts.length;

  if (hasRelated) {
    props.related = {
      posts: relatedPosts,
      title: {
        name: relatedCategory.name || null,
        link: categoryPathBySlug(relatedCategory.slug),
      },
    };
  }

  return {
    props,
  };
}

export async function getStaticPaths() {
  const { posts } = await getRecentPosts({
    count: process.env.POSTS_PRERENDER_COUNT,
    queryIncludes: 'index',
  });

  const paths = posts
    .filter(({ slug }) => typeof slug === 'string')
    .map(({ slug }) => ({
      params: {
        slug,
      },
    }));

  return {
    paths,
    fallback: 'blocking',
  };
}
