import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from "../../hooks/useAuth";
import {
  showMessageModal,
} from '../../state/portals';
import { hasExpired } from '../../state/auth/selectors';
import LoginForm from "../LoginForm/LoginForm";
import Layout from "../Layout/Layout";

const ProtectedRoute = ({ children }) => {
  const sessionTimeout = useSelector(hasExpired);
  const [{ isAuthenticated }] = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      const message = sessionTimeout
        ? 'Session timeout. Please login to continue.'
        : 'You must be logged in to view this page.';
      dispatch(showMessageModal({
        message,
        autoClose: false,
      }));
    }
  }, [isAuthenticated])

  return isAuthenticated
    ? (
      <>
        {children}
      </>
    )
    : (
      <Layout column logo>
        <LoginForm />
      </Layout>
    );
}

export default ProtectedRoute;
