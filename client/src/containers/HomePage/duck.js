import 'es6-promise/auto';
import 'isomorphic-fetch';

import {getClicks, updateUser} from '../../util/localStorage';
import {LOGIN_SUCCESS, LOGOUT} from '../../Auth/duck';

// Actions
const REQUEST_UPDATE_CLICK = 'REQUEST_UPDATE_CLICK';
const RECIEVED_UPDATE_CLICK = 'RECIEVED_UPDATE_CLICK';
const ERROR_UPDATE_CLICK = 'ERROR_UPDATE_CLICK';
const RECIEVED_RESET_CLICK = 'RECIEVED_RESET_CLICK';

// Initial State
const initialClicksState = {
  isFetching: false,
  clicks: getClicks(),
  error: null,
};

// Reducer
export default (state = initialClicksState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        clicks: action.payload.user.nbrClicks.clicks,
      };
    case REQUEST_UPDATE_CLICK:
      return {
        ...state,
        isFetching: true,
      };
    case RECIEVED_UPDATE_CLICK:
      return {
        isFetching: false,
        clicks: state.clicks + 1,
        error: null,
      };
    case RECIEVED_RESET_CLICK:
      return {
        isFetching: false,
        clicks: 0,
        error: null,
      };
    case ERROR_UPDATE_CLICK:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    case LOGOUT:
      return initialClicksState;
    default:
      return state;
  }
};

// Action Creators
const requestClickUpdate = payload => ({
  type: REQUEST_UPDATE_CLICK,
  payload,
});

const receiveClickUpdate = () => ({
  type: RECIEVED_UPDATE_CLICK,
});

const errorClickUpdate = payload => ({
  type: ERROR_UPDATE_CLICK,
  payload,
});

export const updateClicks = (payload) => {
  return (dispatch) => {
    // state updated to inform that the API call is starting
    dispatch(requestClickUpdate());

    return fetch(`http://localhost:8080/api/addClick?id=${payload.id}&token=${payload.token}`)
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          dispatch(receiveClickUpdate());
          updateUser();
        } else {
          dispatch(errorClickUpdate({error: json.message}));
        }
      }).catch(err =>
        dispatch(errorClickUpdate({error: err})),
      );
  };
};

const receiveClickReste = () => ({
  type: RECIEVED_RESET_CLICK,
});

export const resetClicks = (payload) => {
  return (dispatch) => {
    // state updated to inform that the API call is starting
    dispatch(requestClickUpdate());

    return fetch(`http://localhost:8080/api/resetClicks?id=${payload.id}&token=${payload.token}`)
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          dispatch(receiveClickReste());
          updateUser();
        } else {
          dispatch(errorClickUpdate({error: json.message}));
        }
      }).catch(err =>
        dispatch(errorClickUpdate({error: err})),
      );
  };
};
