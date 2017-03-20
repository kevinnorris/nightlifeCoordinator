import * as localStorage from '../util/localStorage';

// Actions
const UPDATE_TOKEN = 'auth/UPDATE_TOKEN';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGOUT = 'auth/LOGOUT';

// Initial State
const initialAuthState = {
  isLoggedIn: false,
  token: localStorage.getToken(),
  user: localStorage.getUser(),
};

// Reducer
export default (state = initialAuthState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case LOGOUT:
      return initialAuthState;
    default:
      return state;
  }
};

// Action Creators
export const loginSuccess = (payload) => {
  localStorage.saveUser(payload.user);
  localStorage.saveToken(payload.token);
  return ({
    type: LOGIN_SUCCESS,
    payload,
  });
};

export const logoutUser = () => {
  localStorage.deleteInfo();
  return {type: LOGOUT};
};
