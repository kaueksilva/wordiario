import Container from 'components/Container';

import styles from './Header.module.scss';

const Header = ({ children }) => {
  return (
    <header className={styles.header}>
      {/* <h1 className={styles.h1}>DIÁRIO OFICIAL DE JABOATÃO DOS GUARARAPES</h1> */}
      <Container>{children}</Container>
    </header>
  );
};

export default Header;
