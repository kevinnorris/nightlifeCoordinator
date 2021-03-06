import 'es6-promise/auto';
import 'isomorphic-fetch';

import {LOGIN_SUCCESS, LOGOUT} from '../../Auth/duck2';

// Actions
const REQUEST_YELP_DATA = 'HOME/REQUEST_YELP_DATA';
const RECIEVED_YELP_DATA = 'HOME/RECIEVED_YELP_DATA';
const ERROR_YELP_DATA = 'HOME/ERROR_YELP_DATA';
const SUCESS_TOGGLE_GOING = 'HOME/SUCESS_TOGGLE_GOING';
const ERROR_TOGGLE_GOING = 'HOME/ERROR_TOGGLE_GOING';

// Initial State
const initalState = {
  isFetching: false,
  searchTerm: '',
  bars: null,
  error: null,
};

// Reducer
export default (state = initalState, action) => {
  switch (action.type) {
    case REQUEST_YELP_DATA:
      return {
        ...state,
        isFetching: true,
      };
    case RECIEVED_YELP_DATA:
      return {
        ...state,
        isFetching: false,
        bars: action.payload.data,
        searchTerm: action.payload.searchTerm,
      };
    case ERROR_YELP_DATA:
      return {
        ...state,
        error: action.payload.error,
      };
    case SUCESS_TOGGLE_GOING: {
      const index = state.bars.findIndex(bar => bar.name === action.payload.businessName);
      const barsCopy = state.bars.map(bar => ({...bar}));
      barsCopy[index] = {
        ...barsCopy[index],
        numGoing: barsCopy[index].numGoing + (action.payload.going ? 1 : -1),
        userGoing: action.payload.going,
      };
      return {
        ...state,
        bars: barsCopy,
      };
    }
    case ERROR_TOGGLE_GOING:
      return {
        ...state,
        error: action.payload.error,
      };
    case LOGIN_SUCCESS: {
      if (state.bars) {
        const barsGoing = state.bars.map(bar => ({
          ...bar,
          userGoing: (bar.usersAttending.indexOf(action.payload.user) !== -1),
        }));
        return {
          ...state,
          bars: barsGoing,
        };
      }
      return state;
    }
    case LOGOUT: {
      if (state.bars) {
        const barsNotGoing = state.bars.map(bar => (
          {
            ...bar,
            userGoing: false,
          }
        ));
        return {
          ...state,
          bars: barsNotGoing,
        };
      }
      return state;
    }
    default:
      return state;
  }
};

// Action Creators
const requestYelpData = () => ({
  type: REQUEST_YELP_DATA,
});

const recievedYelpData = payload => ({
  type: RECIEVED_YELP_DATA,
  payload,
});

const errorYelpData = payload => ({
  type: ERROR_YELP_DATA,
  payload,
});

export const getYelpData = payload => (
  (dispatch) => {
    dispatch(requestYelpData());
    let url = `/api/yelpSearchData?searchTerm=${payload.searchTerm}`;
    if (payload.userId) {
      url += `&userId=${payload.userId}`;
    }
    return fetch(url)
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          dispatch(recievedYelpData({data: json.data, searchTerm: payload.searchTerm}));
        } else {
          dispatch(errorYelpData({error: json.error}));
        }
      }).catch(err =>
        dispatch(errorYelpData({error: err.message})),
      );
  }
);

const successToggleGoing = payload => ({
  type: SUCESS_TOGGLE_GOING,
  payload,
});

const errorToggleGoing = payload => ({
  type: ERROR_TOGGLE_GOING,
  payload,
});

export const toggleGoing = (payload) => {
  let url = `/api/`;
  const body = {
    businessName: payload.businessName,
    userId: payload.userId,
    expireDate: payload.expireDate,
    token: payload.token,
  };
  if (payload.going) {
    url += 'going';
    body.expireDate = payload.expireDate;
  } else {
    url += 'notGoing';
  }

  return dispatch => (
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          dispatch(successToggleGoing({businessName: payload.businessName, going: payload.going}));
        } else {
          dispatch(errorToggleGoing({error: json.error}));
        }
      }).catch(err =>
        dispatch(errorToggleGoing({error: err})),
      )
  );
};
