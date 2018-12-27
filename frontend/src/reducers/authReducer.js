import {
  FETCH_USER_PROFILE,
  RESTART_LOGIN,
  SESSION_TIMEOUT,
  START_AUTHENTICATION,
  START_AUTHENTICATION_SUCCESS,
  START_AUTHENTICATION_FAIL,
  FETCH_CURRENT_USER_SUCCESS, LOGOUT_SUCCESS, LOGOUT_FAIL, USER_SAVED_IN_LOCAL_STORAGE,
} from '../actions/types';

const initialState = {
  user: undefined,
  isAuthenticated: false,
  loginFailedMessage: '',
  inProgress: false,
  token: '',
  error: undefined,
  loggedOut: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_PROFILE:
      return Object.assign({}, state, {
        user: action.payload,
        isAuthenticated: true
      });

    case START_AUTHENTICATION:
      return { ...state, inProgress: true };

    case START_AUTHENTICATION_SUCCESS:
      return {
        ...state,
        token: action.payload.data.token,
        inProgress: false,
      };

    case START_AUTHENTICATION_FAIL:
      return { ...state, inProgress: false };

    case FETCH_CURRENT_USER_SUCCESS:
      return { ...state, user: action.payload.data };

    case USER_SAVED_IN_LOCAL_STORAGE:
      return { ...state, inProgress: false, isAuthenticated: true };

    case LOGOUT_SUCCESS:
    case LOGOUT_FAIL:
      return { ...state, loggedOut: true };

    case RESTART_LOGIN:
      return initialState;

    case SESSION_TIMEOUT:
      return initialState;

    default:
      return state;
  }
}
