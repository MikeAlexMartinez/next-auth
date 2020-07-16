import { mount } from 'enzyme';
import Home, { getServerSideProps } from '../../pages/home';
import useAuth, { AUTH_TOKEN } from '../../hooks/useAuth';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(() => 'Name'),
}))
jest.mock('../../hooks/useAuth.js');

describe('Page: Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  })

  describe('When user isAuthenticated', () => {
    const logoutMock = jest.fn();
    let wrapper

    beforeEach(() => {
      useAuth.mockReturnValue([
        {
          isAuthenticated: true,
        },
        {
          logout: logoutMock,
        }
      ]);
      wrapper = mount(<Home />);
    });

    it('should display `Welcome Name`', () => {
      expect(wrapper.find('h1').text()).toContain('Welcome Name');
    });

    it('should display link to index page', () => {
      const IndexLink = wrapper.find('Link').at(0)
      expect(IndexLink.props().href).toBe('/')
      expect(IndexLink.text()).toBe('Next Auth');
    });

    it('should call logout action when button is clicked', () => {
      const LogoutButton = wrapper.find('button');
      expect(logoutMock).not.toHaveBeenCalled();
      LogoutButton.simulate('click');
      expect(logoutMock).toHaveBeenCalled();
    });
  });

  describe("when user isn't authenticated", () => {
    it('Should render Login Form when isAuthenticated is false', () => {
      useAuth.mockReturnValue([
        {
          isAuthenticated: false,
        },
        {
          logout: jest.fn(),
        }
      ]);
      const wrapper = mount(<Home />);
      const LoginForm = wrapper.find('LoginForm');
      expect(LoginForm).not.toBe(null);
      expect(LoginForm).toHaveLength(1);
    });
  });
});

import nextCookies from 'next-cookies';
import jwtDecode from 'jwt-decode';
import store from '../../state/store';
import isTokenValid from '../../lib/verifyToken';
import { loginSuccess, setExpired } from '../../state/auth/actions';

jest.mock('../../state/store', () => ({
  initializeStore: jest.fn(() => ({
    dispatch: jest.fn(),
    getState: jest.fn(() => ({
      auth: {
        test: 'state',
      },
    })),
  })),
}));
jest.mock('../../lib/verifyToken.js');
jest.mock('next-cookies');
jest.mock('jwt-decode');

const testUser = {
  name: 'Test User',
  id: 1,
};

jwtDecode.mockReturnValue({
  user: testUser,
});

describe('Home Page: Server Side Props', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('Cookies are provided on ctx', () => {
    describe('Token is valid', () => {
      const testToken = 'testToken'
      const initialState = {
        auth: {
          test: 'state',
        },
      };
      const ctxObj = {
        test: 'context',
      };
      let dispatchMock;
      let getStateMock;
      let serverSideProps;

      beforeEach(async () => {
        isTokenValid.mockResolvedValue(true)
        nextCookies.mockReturnValue({
          [AUTH_TOKEN]: testToken,
        });
        dispatchMock = jest.fn();
        getStateMock = jest.fn(() => initialState);
        store.initializeStore.mockReturnValue({
          dispatch: dispatchMock,
          getState: getStateMock,
        });
        serverSideProps = await getServerSideProps(ctxObj);
      });

      it('should call initializeStore', () => {
        expect(store.initializeStore).toHaveBeenCalledTimes(1);
      });

      it('should call nextCookies with ctx', () => {
        expect(nextCookies).toHaveBeenCalledWith(ctxObj);
      });

      it('should call isTokenValid with provided token', () => {
        expect(isTokenValid).toHaveBeenCalledWith(testToken);
      });

      it('should call jwtDecode with provided token', () => {
        expect(jwtDecode).toHaveBeenCalledWith(testToken);
      });

      it('should dispatch loginSuccess action with user', () => {
        expect(dispatchMock).toHaveBeenCalledWith(loginSuccess(testUser));
      });

      it('should return state provided by reduxStore.getState', () => {
        expect(serverSideProps).toEqual({
          props: {
            initialReduxState: initialState,
          },
        });
      });
    });

    describe('Token is Invalid', () => {
      const testToken = 'testToken'
      const initialState = {
        auth: {
          test: 'state',
        },
      };
      const ctxObj = {
        test: 'context',
      };
      let dispatchMock;
      let getStateMock;
      let serverSideProps;

      beforeEach(async () => {
        isTokenValid.mockResolvedValueOnce(false)
        isTokenValid.mockResolvedValue(true)
        nextCookies.mockReturnValue({
          [AUTH_TOKEN]: testToken,
        });
        dispatchMock = jest.fn();
        getStateMock = jest.fn(() => initialState);
        store.initializeStore.mockReturnValue({
          dispatch: dispatchMock,
          getState: getStateMock,
        });
        serverSideProps = await getServerSideProps(ctxObj);
      });

      it('should call initializeStore', () => {
        expect(store.initializeStore).toHaveBeenCalledTimes(1);
      });

      it('should call nextCookies with ctx', () => {
        expect(nextCookies).toHaveBeenCalledWith(ctxObj);
      });

      it('should call isTokenValid with provided token', () => {
        expect(isTokenValid).toHaveBeenCalledWith(testToken);
      });

      it('should dispatch setExpired action', () => {
        expect(dispatchMock).toHaveBeenCalledWith(setExpired());
      });

      it('should return state provided by reduxStore.getState', () => {
        expect(serverSideProps).toEqual({
          props: {
            initialReduxState: initialState,
          },
        });
      });
    });
  });

  describe('No Cookies provided', () => {
    const initialState = {
      auth: {
        test: 'state',
      },
    };
    const ctxObj = {
      test: 'context',
    };
    let dispatchMock;
    let getStateMock;
    let serverSideProps;

    beforeEach(async () => {
      nextCookies.mockReturnValueOnce({});
      dispatchMock = jest.fn();
      getStateMock = jest.fn(() => initialState);
      store.initializeStore.mockReturnValue({
        dispatch: dispatchMock,
        getState: getStateMock,
      });
      serverSideProps = await getServerSideProps(ctxObj);
    });

    it('should call initializeStore', () => {
      expect(store.initializeStore).toHaveBeenCalledTimes(1);
    });

    it('should call nextCookies with ctx', () => {
      expect(nextCookies).toHaveBeenCalledWith(ctxObj);
    });

    it('should not call isTokenValid with provided token', () => {
      expect(isTokenValid).not.toHaveBeenCalled();
    });

    it('should return state provided by reduxStore.getState', () => {
      expect(serverSideProps).toEqual({
        props: {
          initialReduxState: initialState,
        },
      });
    });
  });
});
