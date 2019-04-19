import {
  CREATE_LXC, CREATE_LXC_FAIL, CREATE_LXC_SUCCESS,
} from './types';

const initialState = {
  createFailed: false,
  inProgress: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_LXC:
      return { ...state, inProgress: true, createFailed: false };

    case CREATE_LXC_SUCCESS:
      return {
        ...state,
        token: action.payload.data.token,
        inProgress: false,
        createFailed: false,
      };

    case CREATE_LXC_FAIL:
      return { ...state, inProgress: false, createFailed: true };

    default:
      return state;
  }
}
