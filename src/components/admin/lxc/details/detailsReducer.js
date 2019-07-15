import {
  FETCH_LXC_STATUS,
  FETCH_LXC_STATUS_FAIL,
  SOCKET_FETCH_LXC_STATUS_SUCCESS,
  START_LXC,
  START_LXC_FAIL,
  START_LXC_SUCCESS,
  STOP_LXC,
  STOP_LXC_FAIL,
  STOP_LXC_SUCCESS,
  ASSIGN_LXC,
  ASSIGN_LXC_FAIL,
  ASSIGN_LXC_SUCCESS,
  UNASSIGN_LXC,
  UNASSIGN_LXC_FAIL,
  UNASSIGN_LXC_SUCCESS,
  FETCH_SERVER_INFO,
  FETCH_SERVER_INFO_SUCCESS,
  FETCH_SERVER_INFO_FAIL,
} from './types';

const initialState = {
  failedFetchUser: false,
  inProgressFetchUser: false,
  failedSend: false,
  inProgressSend: false,
  userData: {},
  serverInfo: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SERVER_INFO:
      return { ...state, inProgressFetchUser: false, failedFetchUser: false };

    case FETCH_SERVER_INFO_SUCCESS:
      return {
        ...state,
        inProgressFetchUser: false,
        failedFetchUser: false,
        serverInfo: action.payload.data
      };

    case FETCH_SERVER_INFO_FAIL:
      return { ...state, inProgressFetchUser: false, failedFetchUser: true };

    case FETCH_LXC_STATUS:
      return { ...state, inProgressFetchUser: false, failedFetchUser: false };

    case SOCKET_FETCH_LXC_STATUS_SUCCESS:
      return {
        ...state,
        inProgressFetchUser: false,
        failedFetchUser: false,
        userData: action.payload.data
      };

    case FETCH_LXC_STATUS_FAIL:
      return { ...state, inProgressFetchUser: false, failedFetchUser: true };

    case START_LXC:
    case STOP_LXC:
    case ASSIGN_LXC:
    case UNASSIGN_LXC:
      return { ...state, inProgressSend: true, failedSend: false };

    case START_LXC_SUCCESS:
    case STOP_LXC_SUCCESS:
    case ASSIGN_LXC_SUCCESS:
    case UNASSIGN_LXC_SUCCESS:
      return {
        ...state,
        inProgressSend: false,
        failedSend: false,
      };

    case START_LXC_FAIL:
    case STOP_LXC_FAIL:
    case ASSIGN_LXC_FAIL:
    case UNASSIGN_LXC_FAIL:
      return { ...state, inProgressSend: false, failedSend: true };

    default:
      return state;
  }
}
