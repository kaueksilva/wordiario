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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';

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

  // Função para gerar PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    const marginLeft = 10;
    const marginTop = 10;
    const lineHeight = 7;
    const pageHeight = doc.internal.pageSize.height;
    let currentHeight = marginTop;

    doc.setFontSize(14);
    doc.text(title, marginLeft, currentHeight); // Adiciona o título do post no PDF
    currentHeight += lineHeight + 5; // Ajusta a posição do texto para a próxima linha

    doc.setFontSize(12);
    const contentWithoutHTML = content.replace(/(<([^>]+)>)/gi, ''); // Remove as tags HTML
    const splitContent = doc.splitTextToSize(contentWithoutHTML, 190); // Divide o texto para caber na página

    // Adiciona cada linha de texto, gerenciando o overflow da página
    splitContent.forEach((line) => {
      if (currentHeight + lineHeight > pageHeight - marginTop) {
        doc.addPage(); // Adiciona uma nova página se o conteúdo ultrapassar o limite da página
        currentHeight = marginTop; // Reinicia a altura na nova página
      }
      doc.text(line, marginLeft, currentHeight);
      currentHeight += lineHeight;
    });

    doc.save('post.pdf'); // Salva o PDF com o nome 'post.pdf'
  };

  // Função de impressão personalizada
  const printPostContent = () => {
    const postContent = document.getElementById('postContent').innerHTML;
    const publicationDate = new Date().toLocaleDateString() + ', ' + new Date().toLocaleTimeString();

    const postTitle = title;

    // Mantém o about:blank ao abrir a nova aba
    const printWindow = window.open('about:blank', '', 'width=950,height=700');

    // Define o título da aba na nova janela
    printWindow.document.write('<head><title>' + postTitle + '</title></head>');

    printWindow.document.write(
      '<style> body { font-family: Arial, sans-serif; padding: 20px; } @media print { #printButton { display: none;} .pdfprnt-buttons { display: none;} } </style>'
    );
    printWindow.document.write('</head><body>');

    printWindow.document.write(`<h1 class="title">${postTitle}</h1>`);

    printWindow.document.write(postContent);

    printWindow.document.write(`<p>Publicado em: ${publicationDate}</p>`);

    printWindow.document.write('</footer>');
    printWindow.document.write('</body></html>');

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <Layout>
      <Helmet {...helmetSettings} />
      <ArticleJsonLd post={post} siteTitle={siteMetadata.title} />

      <div className="bg-[radial-gradient(circle_at_center,#ffffff,#AFAFAF)] text-white text-4xl font-bold py-8 text-center relative mt-[110px]">
        <div className="flex justify-center items-center mb-4 flex-wrap">
          <h1 className="text-[40px] font-normal text-[#003476]">DIÁRIO</h1>
          <span className="mx-9">
            <img
              src="/images/logotop.png" // Substitua pelo caminho do seu ícone
              alt="Ícone"
              className="h-20 w-16" // Tamanho aumentado
            />
          </span>
          <h1 className="text-[40px] font-normal text-[#003476]">OFICIAL</h1>
        </div>
        <h2 className="text-[15px] font-normal text-[#003476]">PODER EXECUTIVO</h2>
      </div>

      <div className="text-center mt-0">
        <div className="bg-[#224276] text-white text-center py-4">
          <h1 className="text-[23px] text-[#ffffff] font-bold" dangerouslySetInnerHTML={{ __html: title }} />
        </div>

        <div className="flex justify-center space-x-4 my-4">
          {/* Botão para imprimir o conteúdo */}
          <button
            onClick={printPostContent}
            className="flex items-center space-x-2 bg-[#003476] text-white px-4 py-2 rounded hover:bg-[#002355] transition-colors"
            aria-label="Imprimir conteúdo do post"
          >
            <FontAwesomeIcon icon={faPrint} className="mr-2" />
            Imprimir
          </button>

          {/* Botão para gerar PDF */}
          <button
            onClick={generatePDF}
            className="flex items-center space-x-2 bg-[#003476] text-white px-4 py-2 rounded hover:bg-[#002355] transition-colors"
            aria-label="Gerar PDF"
          >
            <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
            Gerar PDF
          </button>
        </div>
      </div>

      {/* Conteúdo do post */}
      <Content>
        <Section>
          <Container>
            <div
              id="postContent" // ID para referenciar o conteúdo a ser impresso
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
