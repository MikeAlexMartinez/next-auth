import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { showMessageModal } from '../../state/portals';

import ClientOnlyPortal from '../ClientOnlyPortal/ClientOnlyPortal';
import MessageModal from '../MessageModal/MessageModal';

import styles from './WelcomeMessage.module.scss';

const WelcomeMessage = ({ large, message }) => {
  const { query: { loggedIn } } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedIn) {
      dispatch(showMessageModal({
        message: 'Logged In Successfully',
        autoClose: true,
      }));
    }
  }, [loggedIn, dispatch])

  return (
    <>
      <h1 className={classNames(styles.messageText, {
        [styles.large]: large,
      })}>
        Welcome {message}
      </h1>
      <ClientOnlyPortal selector="#message-modal">
        <MessageModal />
      </ClientOnlyPortal>
    </>
  );
};

WelcomeMessage.propTypes = {
  large: PropTypes.bool,
  message: PropTypes.string,
};

WelcomeMessage.defaultProps = {
  large: false,
  message: '',
};

export default WelcomeMessage;