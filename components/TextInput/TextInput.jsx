import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './TextInput.module.scss';

const TextInput = ({
  name,
  type,
  label,
  register,
  value,
}) => {
  const [hasFocus, setFocus] = useState(false);

  return (
    <div className={styles.textInputContainer}>
      <div className={styles.textInputControl}>
        <label htmlFor={name} className={classNames(styles.textInputLabel, {
          [styles.focusedLabel]: (hasFocus || (value !== "" && value !== undefined)),
        })}>
          {label}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setFocus(false)
          }}
          className={styles.textInputInput}
          ref={register}
        />
        <div className={styles.textInputBar} />
      </div>
    </div>
  );
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
};

TextInput.defaultProps = {
  label: '',
  type: 'text',
};

export default TextInput;