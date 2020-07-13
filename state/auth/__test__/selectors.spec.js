import {
  isAuthenticated,
  user,
  userName,
  userId,
  errorMessage,
  isLoggingIn,
  hasExpired,
} from '../selectors';

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

describe('Auth Selectors', () => {
  describe('isAuthenticated', () => {
    it('should return true if auth -> isAuthenticated is set to true', () => {
      expect(isAuthenticated(exampleState)).toBe(true);
    });
    it('should return false if auth -> isAuthenticated is set to false', () => {
      expect(isAuthenticated({
        ...exampleState,
        auth: {
          ...exampleState.auth,
          isAuthenticated: false,
        }
      })).toBe(false);
    });
  });
  describe('user', () => {
    it('should select the current user', () => {
      expect(user(exampleState)).toBe(exampleUser);
    });
  });
  describe('userName', () => {
    it('should select the current users name', () => {
      expect(userName(exampleState)).toBe(exampleUser.name);
    });
  });
  describe('userId', () => {
    it('should select the current users id', () => {
      expect(userId(exampleState)).toBe(exampleUser.id);
    });
  });
  describe('errorMessage', () => {
    it('should select errorMessage from store', () => {
      expect(errorMessage(exampleState)).toBe(testErrorMessage);
    });
  });
  describe('isLoggingIn', () => {
    it('should return true if auth -> isLoggingIn is set to true', () => {
      expect(isLoggingIn(exampleState)).toBe(true);
    });
    it('should return false if auth -> isLoggingIn is set to false', () => {
      expect(isLoggingIn({
        ...exampleState,
        auth: {
          ...exampleState.auth,
          isLoggingIn: false,
        }
      })).toBe(false);
    });
  });
  describe('hasExpired', () => {
    it('should return true if auth -> hasExpired is set to true', () => {
      expect(hasExpired(exampleState)).toBe(true);
    });
    it('should return false if auth -> hasExpired is set to false', () => {
      expect(hasExpired({
        ...exampleState,
        auth: {
          ...exampleState.auth,
          hasExpired: false,
        }
      })).toBe(false);
    });
  });
});
