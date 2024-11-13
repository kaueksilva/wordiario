import Link from 'next/link';

import config from '../../../package.json';
import { Helmet } from 'react-helmet';

import { GrPrevious as PreviousIcon, GrNext as NextIcon } from 'react-icons/gr';
import { HiOutlineDotsHorizontal as Dots } from 'react-icons/hi';
import styles from './Pagination.module.scss';

const MAX_NUM_PAGES = 10; // Ajuste para o número máximo de páginas centrais que deseja exibir

const { homepage = '' } = config;

const Pagination = ({ pagesCount, currentPage, basePath, addCanonical = true }) => {
  const path = `${basePath}/page/`;

  const hasPreviousPage = pagesCount > 1 && currentPage > 1;
  const hasNextPage = pagesCount > 1 && currentPage < pagesCount;

  let hasPrevDots = false;
  let hasNextDots = false;

  function getPages() {
    const pages = [];

    // Sempre inclui a primeira página
    pages.push(1);

    // Define o intervalo central em torno da página atual
    const start = Math.max(2, currentPage - Math.floor(MAX_NUM_PAGES / 2));
    const end = Math.min(pagesCount - 1, currentPage + Math.floor(MAX_NUM_PAGES / 2));

    if (start > 2) {
      hasPrevDots = true;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < pagesCount - 1) {
      hasNextDots = true;
    }

    // Sempre inclui a última página
    pages.push(pagesCount);

    return pages;
  }

  const pages = getPages();

  return (
    <>
      <Helmet>
        {addCanonical && !hasPreviousPage && <link rel="canonical" href={`${homepage}${basePath}`} />}
        {hasPreviousPage && <link rel="prev" href={`${homepage}${path}${currentPage - 1}`} />}
        {hasNextPage && <link rel="next" href={`${homepage}${path}${currentPage + 1}`} />}
      </Helmet>

      <nav className={styles.nav} role="navigation" aria-label="Pagination Navigation">
        {hasPreviousPage && (
          <Link className={styles.prev} href={`${path}${currentPage - 1}`} aria-label="Goto Previous Page">
            <PreviousIcon /> Anterior
          </Link>
        )}

        <ul className={styles.pages}>
          {pages.map((page, index) => {
            const isActive = page === currentPage;
            const isDotsBefore = hasPrevDots && index === 1;
            const isDotsAfter = hasNextDots && index === pages.length - 2;

            if (isDotsBefore) {
              return (
                <li key="prev-dots" className={styles.dots}>
                  <Dots aria-label="Navigation skipped pages" />
                </li>
              );
            }

            if (isDotsAfter) {
              return (
                <li key="next-dots" className={styles.dots}>
                  <Dots aria-label="Navigation skipped pages" />
                </li>
              );
            }

            return isActive ? (
              <li key={page}>
                <span className={styles.active} aria-label={`Current Page, Page ${page}`} aria-current="true">
                  {page}
                </span>
              </li>
            ) : (
              <li key={page}>
                <Link href={`${path}${page}`} aria-label={`Goto Page ${page}`}>
                  <span>{page}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {hasNextPage && (
          <Link className={styles.next} href={`${path}${currentPage + 1}`} aria-label="Goto Next Page">
            Próximo <NextIcon />
          </Link>
        )}
      </nav>
    </>
  );
};

export default Pagination;
