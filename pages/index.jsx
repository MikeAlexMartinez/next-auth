import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { showMessageModal } from '../state/portals';

import Layout from '../components/Layout/Layout';
import WelcomeMessage from '../components/WelcomeMessage/WelcomeMessage';
import UserStatus from '../components/UserStatus/UserStatus';
import ClientOnlyPortal from '../components/ClientOnlyPortal/ClientOnlyPortal';
import MessageModal from '../components/MessageModal/MessageModal';

const Index = () => {
  const { query: { loggedOut } } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedOut) {
      dispatch(showMessageModal({
        message: 'Logged Out Successfully',
        autoClose: true,
      }));
    }
  }, [loggedOut])

  return (
    <Layout>
      <UserStatus />
      <Head>
        <title>Next Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <WelcomeMessage message=" to Next Auth!" large />
      </main>
      <ClientOnlyPortal selector="#message-modal">
        <MessageModal />
      </ClientOnlyPortal>
    </Layout>
  );
}

export default Index;
