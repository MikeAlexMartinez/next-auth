import isTokenValid from '../verifyToken';

import { authApi, setAuthorization } from '../api';
import logger from '../logger';

jest.mock('../logger.js', () => ({
  error: jest.fn(),
}));
jest.mock('../../lib/api.js', () => ({
  authApi: jest.fn(() => ({
    get: jest.fn(),
  })),
  setAuthorization: jest.fn(),
}));

describe('isTokenValid', () => {
  const testToken = 'testtoken';

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('Token is Valid', () => {
    let response;
    let getMock;

    beforeEach(async () => {
      getMock = jest.fn().mockResolvedValue();
      authApi.mockReturnValue({
        get: getMock,
      });
      response = await isTokenValid(testToken);
    })

    it('should call setAuthorization with token', () => {
      expect(setAuthorization).toHaveBeenCalledWith(testToken);
    });

    it('calls AuthApi once', () => {
      expect(authApi).toHaveBeenCalledTimes(1);
    })

    it('calls authApi.get() with "verifyToken"', () => {
      expect(getMock).toHaveBeenCalledWith('verifyToken');
    });

    it('returns true', () => {
      expect(response).toBe(true);
    });
  });

  describe('Token is Invalid', () => {
    const error = new Error('Forbidden')
    let response;
    let getMock;

    beforeEach(async () => {
      getMock = jest.fn().mockRejectedValue(error);
      authApi.mockReturnValue({
        get: getMock,
      });
      response = await isTokenValid(testToken);
    });

    it('should call setAuthorization with token', () => {
      expect(setAuthorization).toHaveBeenCalledWith(testToken);
    });

    it('calls AuthApi once', () => {
      expect(authApi).toHaveBeenCalledTimes(1);
    })

    it('calls authApi.get() with "verifyToken"', () => {
      expect(getMock).toHaveBeenCalledWith('verifyToken');
    });

    it('calls logger error', () => {
      expect(logger.error).toHaveBeenCalledWith(error)
    })

    it('calls setAuthorization twice, second time with no argument', () => {
      expect(setAuthorization).toHaveBeenCalledTimes(2);
      expect(setAuthorization).toHaveBeenCalledWith();
    });

    it('returns false', () => {
      expect(response).toBe(false);
    });
  });
});
