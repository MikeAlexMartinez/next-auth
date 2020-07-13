import { initialState, reducer } from '../reducer';
import {
  startLogin,
  loginSuccess,
  logoutUser,
  loginError,
  setExpired,
} from '../actions';

describe('Auth: reducer', () => {
  it('should return unchanged state if irrelevant action provided', () => {
    expect(reducer(initialState, { type: 'RANDOM' })).toBe(initialState);
  });

  describe('startLogin Action', () => {
    it('should set isLoggingIn to true', () => {
      const updatedState = reducer(initialState, startLogin());
      expect(updatedState.isLoggingIn).toBe(true);
    });
  });

  describe('loginSuccess Action', () => {
    const newUser = {
      name: 'test user',
      id: 101,
    }
    const expectedState = {
      ...initialState,
      isAuthenticated: true,
      user: newUser,
    }
    const testState = {
      ...initialState,
      errorMessage: 'this should be deleted',
      isLoggingIn: true,
      hasExpired: true,
    };
    let updatedState;

    beforeEach(() => {
      updatedState = reducer(testState, loginSuccess(newUser));
    })

    it('should set user to provided user', () => {
      expect(updatedState.user).toBe(newUser);
    });
    it('should set isAuthenticated to true', () => {
      expect(updatedState.isAuthenticated).toBe(true);
    });
    it('should clear errorMessage', () => {
      expect(updatedState.errorMessage).toBe('');
    });
    it('should set isLoggingIn to false', () => {
      expect(updatedState.isLoggingIn).toBe(false);
    });
    it('should set hasExpired to false', () => {
      expect(updatedState.hasExpired).toBe(false);
    });
  });

  describe('logoutUser Action', () => {
    const existingUser = {
      name: 'test user',
      id: 101,
    }
    const testState = {
      ...initialState,
      isAuthenticated: true,
      user: existingUser,
      errorMessage: 'this should be deleted',
      isLoggingIn: true,
      hasExpired: true,
    };
    let updatedState;

    beforeEach(() => {
      updatedState = reducer(testState, logoutUser());
    });

    it('should clear the given user from state', () => {
      expect(updatedState.user).toEqual({});
    });
    it('should set isAuthenticated to false', () => {
      expect(updatedState.isAuthenticated).toBe(false);
    });
    it('should clear errorMessage', () => {
      expect(updatedState.errorMessage).toBe('');
    });
    it('should set isLoggingIn to false', () => {
      expect(updatedState.isLoggingIn).toBe(false);
    });
    it('should set hasExpired to false', () => {
      expect(updatedState.hasExpired).toBe(false);
    });
  });

  describe('loginError Action', () => {
    const existingUser = {
      name: 'test user',
      id: 101,
    }
    const testState = {
      ...initialState,
      isAuthenticated: true,
      user: existingUser,
      errorMessage: '',
      isLoggingIn: true,
      hasExpired: true,
    };
    const errorMessage = 'some error';
    let updatedState;

    beforeEach(() => {
      updatedState = reducer(testState, loginError(errorMessage));
    });

    it('should clear the given user from state', () => {
      expect(updatedState.user).toEqual({});
    });
    it('should set isAuthenticated to false', () => {
      expect(updatedState.isAuthenticated).toBe(false);
    });
    it('should clear errorMessage', () => {
      expect(updatedState.errorMessage).toBe(errorMessage);
    });
    it('should set isLoggingIn to false', () => {
      expect(updatedState.isLoggingIn).toBe(false);
    });
    it('should set hasExpired to false', () => {
      expect(updatedState.hasExpired).toBe(false);
    });
  });

  describe('setExpired Action', () => {
    const existingUser = {
      name: 'test user',
      id: 101,
    }
    const testState = {
      ...initialState,
      isAuthenticated: true,
      user: existingUser,
      errorMessage: '',
      isLoggingIn: true,
      hasExpired: false,
    };
    let updatedState;

    beforeEach(() => {
      updatedState = reducer(testState, setExpired());
    });

    it('should clear the given user from state', () => {
      expect(updatedState.user).toEqual({});
    });
    it('should set isAuthenticated to false', () => {
      expect(updatedState.isAuthenticated).toBe(false);
    });
    it('should clear errorMessage', () => {
      expect(updatedState.errorMessage).toBe('Your session has expired');
    });
    it('should set isLoggingIn to false', () => {
      expect(updatedState.isLoggingIn).toBe(false);
    });
    it('should set hasExpired to false', () => {
      expect(updatedState.hasExpired).toBe(true);
    });
  });

});
