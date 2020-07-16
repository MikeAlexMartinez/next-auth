import React from 'react';

import styles from './Loading.module.scss';

const Loading = () => (
  <span className={styles.loading}>
    <span>&bull;</span>
    <span>&bull;</span>
    <span>&bull;</span>
  </span>
);

export default Loading;