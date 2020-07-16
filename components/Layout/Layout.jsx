import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Router from 'next/router';
import { useDispatch } from 'react-redux';

import { hideMessageModal } from '../../state/portals';
import Logo from '../Logo/Logo';
import styles from './Layout.module.scss';

const Layout = ({ children, column, logo }) => {
  const dispatch = useDispatch();

  // clear modal state to prevent it hanging around between pages in the site
  useEffect(() => {
    const clearMessageModal = () => dispatch(hideMessageModal());
    Router.events.on('routeChangeStart', clearMessageModal);
    return () => Router.events.off('routeChangeStart', clearMessageModal);
  }, [dispatch])

  return (
    <div className={classNames(styles.container, {
      [styles.column]: column,
    })}>
      {logo && <Logo large />}
      <div className={classNames(styles.inner, {
        [styles.column]: column,
      })}>
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  column: PropTypes.bool,
  logo: PropTypes.bool,
};

Layout.defaultProps = {
  column: false,
  logo: false,
};

export default Layout;
