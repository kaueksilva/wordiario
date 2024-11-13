import { WebpageJsonLd } from 'lib/json-ld';
import useSite from 'hooks/use-site';
import { Helmet } from 'react-helmet';
import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import PostCard from 'components/PostCard';
import Pagination from 'components/Pagination/Pagination';

import styles from 'styles/templates/Archive.module.scss';

const DEFAULT_POST_OPTIONS = {};

export default function TemplateArchive({
  title = 'Archive',
  posts,
  postOptions = DEFAULT_POST_OPTIONS,
  slug,
  metadata,
  pagination,
}) {
  const { metadata: siteMetadata = {} } = useSite();

  return (
    <Layout>
      <Helmet>
        <title>{title}</title> {/* Definindo apenas o título da página atual */}
      </Helmet>

      <WebpageJsonLd title={title} description={metadata.description} siteTitle={siteMetadata.title} slug={slug} />

      <Section>
        <Container>
          {Array.isArray(posts) && (
            <>
              <ul className={styles.posts}>
                {posts.map((post) => (
                  <li key={post.slug}>
                    <PostCard post={post} options={postOptions} />
                  </li>
                ))}
              </ul>
              {pagination && (
                <Pagination
                  currentPage={pagination?.currentPage}
                  pagesCount={pagination?.pagesCount}
                  basePath={pagination?.basePath}
                />
              )}
            </>
          )}
        </Container>
      </Section>
    </Layout>
  );
}
