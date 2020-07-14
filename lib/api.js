import { create } from "axios";

export const defaultApiHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

let _authApi;

export const authApi = () => {
  if (_authApi) return _authApi;

  _authApi = create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL,
    headers: {
      ...defaultApiHeaders
    },
  });

  return _authApi;
};

export const setAuthorization = (token, targetApi) => {
  if (!targetApi) {
    targetApi = authApi();
  }
  if (token) {
    targetApi.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    targetApi.defaults.headers.Authorization = undefined;
  }
}
