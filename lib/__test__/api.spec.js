import { authApi, setAuthorization, defaultApiHeaders } from '../api';

import { create } from 'axios';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    defaults: {
      headers: {},
    },
  })),
}));

describe('authApi', () => {
  const testEnv = 'http://test.url/';
  let processEnv;
  let api;

  beforeAll(() => {
    processEnv = {
      ...process.env
    };
    process.env.NEXT_PUBLIC_AUTH_API_BASE_URL = testEnv;
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetModules();
    process.env = processEnv;
  });

  beforeEach(() => {
    api = authApi();
  });

  it('should call Axios create with correct env process url and headers', () => {
    expect(create).toHaveBeenCalledWith({
      baseURL: testEnv,
      headers: defaultApiHeaders,
    });
  });

  it('should cache axios instance', () => {
    const newApi = authApi();
    expect(create).toHaveBeenCalledTimes(1);
    expect(newApi).toBe(api);
  });
});

describe('setAuthorization', () => {
  let api;

  beforeEach(() => {
    api = authApi();
    setAuthorization('token');
  })

  it('should set Authorization token of authApi if token provided and no api given', () => {
    expect(api).toEqual({
      defaults: {
        headers: {
          Authorization: 'Bearer token',
        },
      },
    });
  });

  it('should clear Authorization token if no token provided', () => {
    setAuthorization();
    expect(api).toEqual({
      defaults: {
        headers: {},
      },
    });
  });

  it('should set token on provided object if targetApi given', () => {
    const testApi = {
      defaults: {
        headers: {}
      }
    }
    const newToken = 'newtoken'
    setAuthorization(newToken, testApi);
    expect(testApi).toEqual({
      defaults: {
        headers: {
          Authorization: 'Bearer newtoken'
        },
      },
    })
  });
});
