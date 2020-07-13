import { createSelector } from 'reselect';

const rootSelector = (state) => state.auth;

export const isAuthenticated = createSelector(
  rootSelector,
  (authState) => authState.isAuthenticated
);

export const user = createSelector(
  rootSelector,
  (authState) => authState.user
);

export const userName = createSelector(
  user,
  (userInfo) => userInfo.name,
);

export const userId = createSelector(
  user,
  (userInfo) => userInfo.id
);

export const errorMessage = createSelector(
  rootSelector,
  (authState) => authState.errorMessage
);

export const isLoggingIn = createSelector(
  rootSelector,
  (authState) => authState.isLoggingIn
);

export const hasExpired = createSelector(
  rootSelector,
  (authState) => authState.hasExpired
);
