import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import {
  isLoggingIn,
  userName,
  isAuthenticated,
  checkingToken,
} from '../state/auth/selectors';
import {
  startLogin,
  logoutUser,
  loginError,
  loginSuccess,
  checkUserToken,
  finishedChecking,
} from '../state/auth/actions';
import { authApi, setAuthorization } from '../lib/api';
import isTokenValid from '../lib/verifyToken';
import { showMessageModal } from '../state/portals';

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
  const isCheckingToken = useSelector(checkingToken);

  const decodeAndLogin = (token) => {
    const { user } = jwtDecode(token);
    dispatch(loginSuccess(user));
  }

  const processLoginSuccess = (token) => {
    Cookies.set(AUTH_TOKEN, token, { expires: 7 })
    setAuthorization(token);
    decodeAndLogin(token);
  }

  const checkToken = async () => {
    const token = Cookies.get(AUTH_TOKEN);
    if (token) {
      dispatch(checkUserToken());
      const tokenIsValid = await isTokenValid(token);
      if (tokenIsValid) {
        return decodeAndLogin(token);
      }
      dispatch(finishedChecking())
    }
  }

  const handleLogin = async (loginForm) => {
    dispatch(startLogin());

    let errorMessage;
    try {
      const { data: { token } } = await authApi().post('login', loginForm);
      if (token) {
        processLoginSuccess(token);
        router.push('/home?loggedIn=true');
        return;
      }
      errorMessage = "Unable to login";
      dispatch(loginError(errorMessage));
    } catch (e) {
      errorMessage = getErrorMessageFromLoginResponse(e.response);
      dispatch(loginError(errorMessage));
    }
    dispatch(showMessageModal({
      message: errorMessage,
      autoClose: true,
    }));
  }

  const logout = () => {
    Cookies.remove(AUTH_TOKEN);
    setAuthorization('');
    router.push('/?loggedOut=true');
    setTimeout(() => {
      dispatch(logoutUser());
    })
  }

  return [
    {
      isLoggingIn: userIsLoggingIn,
      userName: usersName,
      isAuthenticated: userIsAuthenticated,
      checkingToken: isCheckingToken,
    },
    {
      login: handleLogin,
      logout,
      checkToken,
    },
  ];
}