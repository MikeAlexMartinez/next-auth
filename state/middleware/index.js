import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

const middleware = [
  thunkMiddleware,
];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

export default applyMiddleware(...middleware);
