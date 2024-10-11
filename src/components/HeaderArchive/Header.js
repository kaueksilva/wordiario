import styles from './Header.module.scss';

const Header = ({ children }) => {
  return (
    <header className={styles.header}>
      <div>{children}</div>
    </header>
  );
};

export default Header;
