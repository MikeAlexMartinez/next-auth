export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const CHECKING_TOKEN = 'CHECKING_TOKEN';
export const FINISHED_CHECKING = 'FINISHED_CHECKING';
export const SET_EXPIRED = 'SET_EXPIRED';

export const startLogin = () => ({
  type: LOGIN,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logoutUser = () => ({
  type: LOGOUT,
});

export const loginError = (errorMessage) => ({
  type: LOGIN_ERROR,
  payload: errorMessage,
});

export const setExpired = () => ({
  type: SET_EXPIRED,
});

export const checkUserToken = () => ({
  type: CHECKING_TOKEN,
});

export const finishedChecking = () => ({
  type: FINISHED_CHECKING,
});
