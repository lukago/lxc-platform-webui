import {
  FETCH_USER,
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
  UPDATE_PASSWORD_USER, UPDATE_PASSWORD_USER_FAIL, UPDATE_PASSWORD_USER_SUCCESS,
  UPDATE_USER, UPDATE_USER_FAIL, UPDATE_USER_SUCCESS,
} from './types';

const initialState = {
  failedFetchUser: false,
  inProgressFetchUser: false,
  failedSend: false,
  inProgressSend: false,
  userData: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, inProgressFetchUser: true, failedFetchUser: false };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        inProgressFetchUser: false,
        failedFetchUser: false,
        userData: action.payload.data
      };

    case FETCH_USER_FAIL:
      return { ...state, inProgressFetchUser: false, failedFetchUser: true };

    case UPDATE_USER:
    case UPDATE_PASSWORD_USER:
      return { ...state, inProgressSend: true, failedSend: false };

    case UPDATE_USER_SUCCESS:
    case UPDATE_PASSWORD_USER_SUCCESS:
      return {
        ...state,
        inProgressSend: false,
        failedSend: false,
      };

    case UPDATE_USER_FAIL:
    case UPDATE_PASSWORD_USER_FAIL:
      return { ...state, inProgressSend: false, failedSend: true };

    default:
      return state;
  }
}
