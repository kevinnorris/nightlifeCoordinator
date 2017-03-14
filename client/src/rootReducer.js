import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import auth from './Auth/duck';
import clicks from './containers/HomePage/duck';

export default combineReducers({
  auth,
  clicks,
  routing: routerReducer,
});
