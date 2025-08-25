import Link from 'next/link';

import classes from './button.module.css';

const Button = ({ children, link, onClick }) => {
  if (link) {
    return (
      <Link href={link} legacyBehavior>
        <a className={classes.btn}>{children}</a>
      </Link>
    );
  }
  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
