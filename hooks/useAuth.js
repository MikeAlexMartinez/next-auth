import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import {
  isLoggingIn,
  userName,
  isAuthenticated,
} from '../state/auth/selectors';
import { startLogin, logoutUser, loginError, loginSuccess } from '../state/auth/actions';
import { authApi, setAuthorization } from '../lib/api';

export const AUTH_TOKEN = 'next_auth';

export const getErrorMessageFromLoginResponse = (response = {}) => {
  const defaultMessage = 'Unexpected error occurred - Please try again';
  const messages = {
    [401]: 'Incorrect username or password - Please try again',
  }
  return messages[response.status] || defaultMessage;
}

export default function useAuth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userIsLoggingIn = useSelector(isLoggingIn);
  const usersName = useSelector(userName);
  const userIsAuthenticated = useSelector(isAuthenticated);

  const processLoginSuccess = (token) => {
    Cookies.set(AUTH_TOKEN, token, { expires: 7 })
    setAuthorization(token);
    const { user } = jwtDecode(token);
    dispatch(loginSuccess(user));
  }

  const handleLogin = async (loginForm) => {
    dispatch(startLogin());

    try {
      const { data: { token } } = await authApi().post('login', loginForm);
      if (token) {
        return processLoginSuccess(token);
      }
      dispatch(loginError('Unable to login'));
    } catch (e) {
      const errorMessage = getErrorMessageFromLoginResponse(e.response);
      dispatch(loginError(errorMessage));
    }
  }

  const logout = () => {
    Cookies.remove(AUTH_TOKEN);
    setAuthorization('');
    dispatch(logoutUser());
    router.push('/?loggedOut=true');
  }

  return [
    {
      isLoggingIn: userIsLoggingIn,
      userName: usersName,
      isAuthenticated: userIsAuthenticated,
    },
    {
      login: handleLogin,
      logout,
    },
  ];
}