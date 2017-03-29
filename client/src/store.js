import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';

import rootReducer from './rootReducer';

// For redux debugging
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = applyMiddleware(
  routerMiddleware(browserHistory),
  thunk,
);

const store = createStore(
  rootReducer,
  // composeEnhancers(
  middleware,
  // )
);

export default store;
