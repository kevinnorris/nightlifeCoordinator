import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import auth from './Auth/duck';
import yelpData from './containers/HomePage/duck';

export default combineReducers({
  auth,
  yelpData,
  routing: routerReducer,
});
