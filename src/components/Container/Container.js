import ClassName from 'models/classname';
import styles from './Container.module.scss';

const Container = ({ children, className }) => {
  const containerClassName = new ClassName(styles.container);

  containerClassName.addIf(className);

  return <div className={containerClassName.toString()}>{children}</div>;
};

export default Container;
