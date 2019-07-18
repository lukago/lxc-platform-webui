import {
  FETCH_JOB_LIST,
  FETCH_JOB_LIST_FAIL,
  FETCH_JOB_LIST_SUCCESS,
} from './types';

const initialState = {
  fetchJobsFailed: false,
  inProgressList: false,
  jobList: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_JOB_LIST:
      return { ...state, inProgressList: true, fetchJobsFailed: false };

    case FETCH_JOB_LIST_SUCCESS:
      return {
        ...state,
        inProgressList: false,
        fetchJobsFailed: false,
        jobList: action.payload.data
      };

    case FETCH_JOB_LIST_FAIL:
      return { ...state, inProgressList: false, fetchJobsFailed: true };

    default:
      return state;
  }
}
