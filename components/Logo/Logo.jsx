import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';

import styles from './Logo.module.scss';

const Logo = ({ large }) => {
  return (
    <Link href="/">
      <h1 className={classNames(styles.logoText, {
        [styles.large]: large,
      })}>
        Next Auth
      </h1>
    </Link>
  );
};

Logo.propTypes = {
  large: PropTypes.bool,
};

Logo.defaultProps = {
  large: false,
};

export default Logo;
