import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SET_EXPIRED,
} from './actions';

export const initialState = {
  isAuthenticated: false,
  user: {},
  errorMessage: '',
  isLoggingIn: false,
  hasExpired: false,
};

export const reducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN: {
      return {
        ...state,
        isLoggingIn: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        errorMessage: '',
        isLoggingIn: false,
        hasExpired: false,
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        errorMessage: payload,
        isLoggingIn: false,
        hasExpired: false,
      };
    }
    case LOGOUT: {
      return {
        isAuthenticated: false,
        user: {},
        errorMessage: '',
        isLoggingIn: false,
        hasExpired: false,
      };
    }
    case SET_EXPIRED: {
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        isLoggingIn: false,
        errorMessage: 'Your session has expired',
        hasExpired: true,
      };
    }
    default:
      return state;
  }
};
