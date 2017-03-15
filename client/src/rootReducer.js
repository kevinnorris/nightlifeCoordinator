import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import auth from './Auth/duck';

export default combineReducers({
  auth,
  routing: routerReducer,
});
