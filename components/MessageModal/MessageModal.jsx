import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { IoIosClose } from 'react-icons/io';

import {
  getMessageModal,
  hideMessageModal,
} from '../../state/portals';

import styles from './MessageModal.module.scss';

const MessageModal = ({
  delay,
}) => {
  const dispatch = useDispatch();
  const {
    isVisible,
    message,
    autoClose,
  } = useSelector(getMessageModal);
  const [display, setDisplay] = useState(false);

  // This manages sliding the modal into the page
  useEffect(() => {
    let timeout;
    if (isVisible) {
      timeout = setTimeout(() => {
        setDisplay(true);
      }, 500);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }, [isVisible]);

  // This effect manages closing the modal
  useEffect(() => {
    let timeout;
    if (autoClose && isVisible) {
      timeout = setTimeout(() => {
        setDisplay(false);
        dispatch(hideMessageModal());
      }, delay);
    }
    if (!isVisible) {
      setDisplay(false);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      };
    };
  }, [autoClose, isVisible, dispatch])

  return (
    <div className={classNames(styles.messageModalContainer, {
      [styles.open]: display,
    })}>
      <div className={styles.messageContainer}>
        {message}
      </div>
      <button
        className={styles.closeButton}
        onClick={() => dispatch(hideMessageModal())}
      >
        <IoIosClose color="#000" />
      </button>
    </div>
  );
};

MessageModal.propTypes = {
  delay: PropTypes.number,
};

MessageModal.defaultProps = {
  delay: 5000,
};

export default MessageModal;
