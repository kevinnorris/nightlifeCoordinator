import {push} from 'react-router-redux';

import * as localStorage from '../util/localStorage';

// Actions
const UPDATE_TOKEN = 'auth/UPDATE_TOKEN';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGOUT = 'auth/LOGOUT';
const ERROR = 'auth/ERROR ';

// Initial State
const initialAuthState = {
  isLoggedIn: localStorage.getToken() ? true : false,
  error: null,
  token: localStorage.getToken(),
  user: localStorage.getUser(),
};

const emptyState = {
  isLoggedIn: false,
  error: null,
  token: '',
  user: '',
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
        error: null,
      };
    case LOGOUT:
      return emptyState;
    case ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
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

const error = payload => ({
  type: ERROR,
  payload,
});

export const signUp = payload => (
  dispatch => (
    fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: payload.email, password: payload.password}),
    })
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          dispatch(loginSuccess({user: json.user, token: json.token}));
          dispatch(push('/'));
        } else {
          dispatch(error({error: json.error}));
        }
      }).catch(err =>
        dispatch(error({error: err})),
      )
  )
);

export const login = payload => (
  dispatch => (
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: payload.email, password: payload.password}),
    })
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          dispatch(loginSuccess({user: json.user, token: json.token}));
          dispatch(push('/'));
        } else {
          dispatch(error({error: json.error}));
        }
      }).catch(err =>
        dispatch(error({error: err})),
      )
  )
);

