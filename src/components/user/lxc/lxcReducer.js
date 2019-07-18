import {
  FETCH_LXC_LIST,
  FETCH_LXC_LIST_FAIL,
  FETCH_LXC_LIST_SUCCESS,
} from './types';

const initialState = {
  fetchLxcsFailed: false,
  inProgress: false,
  inProgressList: false,
  lxcList: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_LXC_LIST:
      return { ...state, inProgressList: true, fetchLxcsFailed: false };

    case FETCH_LXC_LIST_SUCCESS:
      return {
        ...state,
        inProgressList: false,
        fetchLxcsFailed: false,
        lxcList: action.payload.data
      };

    case FETCH_LXC_LIST_FAIL:
      return { ...state, inProgressList: false, fetchLxcsFailed: true };

    default:
      return state;
  }
}
