import {CREATE_LXC} from './types';

export const createLxc = (lxcName) => {
  return {
    type: CREATE_LXC,
    payload: {
      request: {
        method: 'post',
        url: '/api/lxc',
        data: {
          name: lxcName,
        },
      },
    },
  };
};