import { useMemo } from 'react';
import { createStore, combineReducers } from 'redux';

import middleware from './middleware';
import {
  reducer as auth,
  initialState as authInitialState,
} from './auth/reducer';
import {
  reducer as portals,
  initialState as portalInitialState,
} from './portals';

let store;

const initialState = {
  auth: authInitialState,
  portals: portalInitialState,
};

const rootReducer = combineReducers({
  auth,
  portals,
});

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For server rendered home page always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

function initStore(preloadedState = initialState) {
  return createStore(
    rootReducer,
    preloadedState,
    middleware
  );
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
