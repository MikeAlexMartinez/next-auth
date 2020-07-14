import useAuth, { getErrorMessageFromLoginResponse, AUTH_TOKEN } from '../useAuth';

const defaultMessage = 'Unexpected error occurred - Please try again'
const error401 = 'Incorrect username or password - Please try again'

describe('getErrorMessageFromLoginResponse', () => {
  it("should return default message if no response provided", () => {
    expect(getErrorMessageFromLoginResponse()).toBe(defaultMessage);
  });
  it("should return default message if status hasn`t been defined", () => {
    expect(getErrorMessageFromLoginResponse({ status: 500 })).toBe(defaultMessage);
  });
  it('should return defined messaged for 401 status', () => {
    expect(getErrorMessageFromLoginResponse({ status: 401 })).toBe('Incorrect username or password - Please try again');
  });
});

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { authApi, setAuthorization } from '../../lib/api';
import { logoutUser, startLogin, loginSuccess, loginError } from '../../state/auth/actions';

jest.mock('react-redux', () => {
  const testErrorMessage = 'test error message';
  const exampleUser = {
    name: 'Michael Martinez',
    id: 1,
  }
  const exampleState = {
    auth: {
      isAuthenticated: true,
      user: exampleUser,
      errorMessage: testErrorMessage,
      isLoggingIn: true,
      hasExpired: true,
    },
  };

  return {
    useSelector: jest.fn((fn) => fn(exampleState)),
    useDispatch: jest.fn(() => jest.fn()),
  };
});
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  }))
}));
jest.mock('js-cookie', () => ({
  set: jest.fn(),
  remove: jest.fn(),
}))
jest.mock('jwt-decode');
jest.mock('../../lib/api.js', () => ({
  authApi: jest.fn(() => ({
    post: jest.fn(),
  })),
  setAuthorization: jest.fn(),
}));

const testUser = {
  name: 'Test User',
  id: 1,
};

jwtDecode.mockReturnValue({
  user: testUser,
});

describe('useAuth', () => {
  let useAuthInterface;
  let dispatchMock;
  let routerPushMock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    dispatchMock = jest.fn();
    routerPushMock = jest.fn();
    useRouter.mockReturnValue({
      push: routerPushMock,
    });
    useDispatch.mockReturnValue(dispatchMock);
    useAuthInterface = useAuth();
  });

  it('should call useDispatch Once', () => {
    expect(useDispatch).toHaveBeenCalledTimes(1);
  });

  it('should call useSelector 3 times', () => {
    expect(useSelector).toHaveBeenCalledTimes(3);
  });

  it('should call useRouter Once', () => {
    expect(useRouter).toHaveBeenCalledTimes(1);
  });

  describe('Props', () => {
    it('should return expected properties from state', () => {
      const props = useAuthInterface[0]
      expect(props).toEqual({
        isLoggingIn: true,
        userName: 'Michael Martinez',
        isAuthenticated: true,
      });
    });
  });

  describe('Actions', () => {
    let login, logout;

    beforeEach(() => {
      ({ login, logout } = useAuthInterface[1]);
    });

    describe('useAuth login', () => {
      describe('successful login', () => {
        const loginForm = {
          username: 'test',
          password: 'isasecret',
        };
        const testToken = 'testtoken';
        let postMock;
        beforeEach(async () => {
          postMock = jest.fn().mockResolvedValue({
            data: {
              token: testToken,
            },
          });
          authApi.mockReturnValue({
            post: postMock,
          });
          await login(loginForm);
        });

        it('should call dispatch with startLogin', () => {
          expect(dispatchMock).toHaveBeenCalledWith(startLogin());
        });

        it('should call authApi', () => {
          expect(authApi).toHaveBeenCalledTimes(1);
        });

        it('should call authApi.post with login and loginForm', () => {
          expect(postMock).toHaveBeenCalledWith('login', loginForm)
        });

        it('should call Cookies.set with AUTH_TOKEN, token, and expiry', () => {
          expect(Cookies.set).toHaveBeenCalledWith(AUTH_TOKEN, testToken, { expires: 7 });
        });

        it('should call setAuthorization with token', () => {
          expect(setAuthorization).toHaveBeenCalledWith(testToken);
        });

        it('should call jwtDecode with empty string', () => {
          expect(jwtDecode).toHaveBeenCalledWith(testToken);
        });

        it('should call dispatch with loginSuccess(user)', () => {
          expect(dispatchMock).toHaveBeenCalledWith(loginSuccess(testUser));
        });
      });

      describe('error thrown', () => {
        const loginForm = {
          username: 'test',
          password: 'isasecret',
        };
        const testToken = 'testtoken';
        let postMock;
        beforeEach(async () => {
          postMock = jest.fn().mockRejectedValue({
            response: {
              status: 401,
            },
          });
          authApi.mockReturnValue({
            post: postMock,
          });
          await login(loginForm);
        });

        it('should call dispatch with startLogin', () => {
          expect(dispatchMock).toHaveBeenCalledWith(startLogin());
        });

        it('should call authApi', () => {
          expect(authApi).toHaveBeenCalledTimes(1);
        });

        it('should call authApi.post with login and loginForm', () => {
          expect(postMock).toHaveBeenCalledWith('login', loginForm)
        });

        it('should call dispatch with loginError(errorMessage)', () => {
          expect(dispatchMock).toHaveBeenCalledWith(loginError(error401));
        });
      });

      describe('no token', () => {
        const loginForm = {
          username: 'test',
          password: 'isasecret',
        };
        let postMock;
        beforeEach(async () => {
          postMock = jest.fn().mockResolvedValue({
            data: {},
          });
          authApi.mockReturnValue({
            post: postMock,
          });
          await login(loginForm);
        });

        it('should call dispatch with startLogin', () => {
          expect(dispatchMock).toHaveBeenCalledWith(startLogin());
        });

        it('should call authApi', () => {
          expect(authApi).toHaveBeenCalledTimes(1);
        });

        it('should call authApi.post with login and loginForm', () => {
          expect(postMock).toHaveBeenCalledWith('login', loginForm)
        });

        it('should not setAuthorization', () => {
          expect(setAuthorization).not.toHaveBeenCalled();
        })

        it('should call dispatch with loginError(message)', () => {
          expect(dispatchMock).toHaveBeenCalledWith(loginError('Unable to login'));
        });
      });
    });

    describe('useAuth logout', () => {
      beforeEach(() => {
        logout();
      })

      it('should call Cookies.remove with AUTH_TOKEN', () => {
        expect(Cookies.remove).toHaveBeenCalledWith(AUTH_TOKEN);
      });

      it('should call setAuthorization with empty string', () => {
        expect(setAuthorization).toHaveBeenCalledWith('');
      });

      it('should call dispatch with logoutUser action', () => {
        expect(dispatchMock).toHaveBeenCalledWith(logoutUser());
      });

      it("should call router.push with '/?loggedOut=true'", () => {
        expect(routerPushMock).toHaveBeenCalledWith('/?loggedOut=true')
      });
    });
  });
});
