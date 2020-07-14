import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Layout.module.scss';

const Layout = ({ children, column }) => {
  return (
    <div className={classNames(styles.container, {
      [styles.column]: column,
    })}>
      {children}
    </div>
  );
};

Layout.propTypes = {
  column: PropTypes.bool,
};

Layout.defaultProps = {
  column: false,
};

export default Layout;
