import {CREATE_USER, DELETE_USER, FETCH_USER_LIST} from './types';

export const createUser = (userDto) => {
  return {
    type: CREATE_USER,
    payload: {
      request: {
        method: 'post',
        url: '/api/auth/signup',
        data: {
          username: userDto.username,
          email: userDto.email,
          roles: userDto.roles,
          password: userDto.password,
          passwordRetype: userDto.passwordRetype,
        },
      },
    },
  };
};

export const deleteUser = (username) => {
  return {
    type: DELETE_USER,
    payload: {
      request: {
        method: 'delete',
        url: `/api/users/${username}`,
      },
    },
  };
};

export const fetchUserList = () => {
  return {
    type: FETCH_USER_LIST,
    payload: {
      request: {
        method: 'get',
        url: '/api/users',
      },
    },
  };
};
