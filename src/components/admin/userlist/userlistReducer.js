import {
  CREATE_USER,
  CREATE_USER_FAIL,
  CREATE_USER_SUCCESS, DELETE_USER, DELETE_USER_FAIL, DELETE_USER_SUCCESS,
  FETCH_USER_LIST,
  FETCH_USER_LIST_FAIL,
  FETCH_USER_LIST_SUCCESS,
} from './types';

const initialState = {
  createFailed: false,
  fetchUsersFailed: false,
  deleteFailed: false,
  inProgressCreate: false,
  inProgressList: false,
  inProgressDelete: false,
  userList: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, inProgressCreate: true, createFailed: false };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        inProgressCreate: false,
        createFailed: false,
      };

    case CREATE_USER_FAIL:
      return { ...state, inProgressCreate: false, createFailed: true };

    case FETCH_USER_LIST:
      return { ...state, inProgressList: true, fetchUsersFailed: false };

    case FETCH_USER_LIST_SUCCESS:
      return {
        ...state,
        inProgressList: false,
        fetchUsersFailed: false,
        userList: action.payload.data
      };

    case FETCH_USER_LIST_FAIL:
      return { ...state, inProgressList: false, fetchUsersFailed: true };

    case DELETE_USER:
      return { ...state, inProgressDelete: true, deleteFailed: false };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        inProgressDelete: false,
        deleteFailed: false,
      };

    case DELETE_USER_FAIL:
      return { ...state, inProgressDelete: false, deleteFailed: true };

    default:
      return state;
  }
}
