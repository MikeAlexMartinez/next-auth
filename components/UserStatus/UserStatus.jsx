import React from 'react';
import Link from 'next/link';
import { IoIosHome } from 'react-icons/io'

import Loading from '../Loading/Loading';

import styles from './UserStatus.module.scss';
import useTokenChecker from '../../hooks/useTokenChecker';

const UserStatus = () => {
  const [checkingToken, isAuthenticated] = useTokenChecker();

  return (
    <div className={styles.userStatusContainer}>
      {isAuthenticated && (
        <Link href="/home">
          <a><IoIosHome color="#eaeaea" size="2em" /></a>
        </Link>
      )}
      {checkingToken && (
        <div className={styles.loadingIcon}>
          <Loading />
        </div>
      )}
      {!isAuthenticated && !checkingToken && (
        <div>
          <p>
            Already a user?
            {' '}
            <Link href="/login">
              <a className={styles.loginLink}>Login</a>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default UserStatus;
