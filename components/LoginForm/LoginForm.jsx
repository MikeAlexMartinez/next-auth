import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import useAuth from '../../hooks/useAuth';
import useTokenChecker from '../../hooks/useTokenChecker';

import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import ClientOnlyPortal from '../ClientOnlyPortal/ClientOnlyPortal';
import MessageModal from '../MessageModal/MessageModal';
import Loading from '../Loading/Loading';

import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const router = useRouter();
  const [authProps, authActions] = useAuth();
  const [checkingToken] = useTokenChecker();
  const [submittedForm, setSubmittedForm] = useState(false);
  const {
    isLoggingIn,
    isAuthenticated,
  } = authProps
  const { watch, register, handleSubmit } = useForm();
  const watchFields = watch(['username', 'password']);
  const { username, password } = watchFields;

  const onSubmit = (data) => {
    setSubmittedForm(true);
    authActions.login(data);
  }

  useEffect(() => {
    if (isAuthenticated) {
      const destination = `/home${submittedForm ? '?loggedIn=true' : ''}`;
      router.push(destination);
    }
  }, [isAuthenticated, checkingToken, submittedForm])

  return (
    <div className={styles.loginFormContainer}>
      {checkingToken && <Loading />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput name="username" type="text" label="Username" value={username} register={register} />
        <TextInput name="password" type="password" label="Password" value={password} register={register} />
        <Button type="submit" disabled={isLoggingIn} loading={isLoggingIn} text="Login" />
      </form>
      <ClientOnlyPortal selector="#message-modal">
        <MessageModal />
      </ClientOnlyPortal>
    </div>
  );
};

export default LoginForm;
