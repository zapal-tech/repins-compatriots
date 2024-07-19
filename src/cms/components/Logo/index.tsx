import Link from 'next/link';

import classes from './index.module.scss';

export const Logo = () => (
  <Link className={classes['logo-link']} href="/" rel="noreferrer" target="_blank">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="" className={classes.logo}>
      <path d="" />
    </svg>
  </Link>
);
