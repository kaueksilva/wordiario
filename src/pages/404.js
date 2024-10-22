import Link from 'next/link';
import { Helmet } from 'react-helmet';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';

import styles from 'styles/pages/Error.module.scss';

export default function Custom404() {
  return (
    <Layout>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Section>
        <Container className={styles.center}>
          <h1>Page Not Found</h1>
          <p className={styles.errorCode}>404</p>
          <p className={styles.errorMessage}>A página que você estava procurando não pôde ser encontrada.</p>
          <p>
            <Link href="/"> Voltar para home</Link>
          </p>
        </Container>
      </Section>
    </Layout>
  );
}

// Next.js method to ensure a static page gets rendered
export async function getStaticProps() {
  return {
    props: {},
  };
}
