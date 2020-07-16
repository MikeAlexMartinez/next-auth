import React from 'react';
import { useSelector } from 'react-redux';
import nextCookies from 'next-cookies';
import jwtDecode from 'jwt-decode';

import { initializeStore } from '../state/store';
import { loginSuccess, setExpired } from '../state/auth/actions';
import { userName } from '../state/auth/selectors';
import useAuth, { AUTH_TOKEN } from '../hooks/useAuth'

import isTokenValid from '../lib/verifyToken';

import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import Layout from '../components/Layout/Layout';
import Logo from '../components/Logo/Logo';
import Button from '../components/Button/Button';
import WelcomeMessage from '../components/WelcomeMessage/WelcomeMessage';

function Home() {
  const [_, authActions] = useAuth();
  const name = useSelector(userName);

  return (
    <ProtectedRoute>
      <Layout column>
        <Logo large />
        <WelcomeMessage large message={name} />
        <Button text="Logout" onClick={() => authActions.logout()} />
      </Layout>
    </ProtectedRoute>
  );
}

export default Home;

export async function getServerSideProps(ctx) {
  const reduxStore = initializeStore();
  const cookies = nextCookies(ctx);

  if (cookies && cookies[AUTH_TOKEN]) {
    const token = cookies[AUTH_TOKEN];
    const tokenIsValid = await isTokenValid(token)
    if (tokenIsValid) {
      const { user } = jwtDecode(token);
      reduxStore.dispatch(loginSuccess(user));
    } else {
      reduxStore.dispatch(setExpired());
    }
  }

  const initialReduxState = reduxStore.getState();
  return {
    props: {
      initialReduxState,
    },
  };
}
