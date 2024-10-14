import Link from 'next/link';
import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';
import Metadata from 'components/Metadata';
import { FaMapPin } from 'react-icons/fa';
import styles from './PostCard.module.scss';
// Função para formatar a data
const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const PostCard = ({ post, options = {} }) => {
  const { title, excerpt, slug, isSticky = false, date } = post;
  const { excludedate = [] } = options;
  const postCardStyle = isSticky
    ? `${styles.postCard} 
    ${styles.postCardSticky}`
    : styles.postCard;

  return (
    <div className={postCardStyle}>
      {isSticky && <FaMapPin aria-label="Sticky Post" />}
      <Link href={postPathBySlug(slug)}>
        <h3 className={styles.postCardTitle} dangerouslySetInnerHTML={{ __html: title }} />
      </Link>
      <Metadata className={styles.postCardMetadata} />
      {excerpt && (
        <div className={styles.postCardContent} dangerouslySetInnerHTML={{ __html: sanitizeExcerpt(excerpt) }} />
      )}
      {!excludedate.includes('date') && <div className={styles.postCardate}> {formatDate(date)} </div>}
    </div>
  );
};

export default PostCard;
