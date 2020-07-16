import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

import Loading from '../Loading/Loading'

const Button = ({
  loading,
  disabled,
  type,
  text,
  onClick,
}) => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button} type={type} disabled={disabled} onClick={onClick}>
        {loading
          ? <Loading />
          : text
        }
      </button>
    </div>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => { },
  disabled: false,
  loading: false,
  type: 'button',
};

export default Button;
