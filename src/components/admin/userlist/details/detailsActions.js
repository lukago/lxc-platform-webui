import {FETCH_USER, UPDATE_PASSWORD_USER, UPDATE_USER} from "./types";

export const fetchUser = (username) => {
  return {
    type: FETCH_USER,
    payload: {
      request: {
        method: 'get',
        url: `/api/users/${username}`,
      },
    },
  };
};

export const updateUserData = (user) => {
  return {
    type: UPDATE_USER,
    payload: {
      request: {
        method: 'post',
        url: `/api/users/${user.username}`,
        data: {
          ...user,
        },
        headers: {'If-Match': user.version}
      },
    },
  };
};

export const updateUserPassowrd = (username, oldPassword, password,
    passwordRetype, version) => {
  return {
    type: UPDATE_PASSWORD_USER,
    payload: {
      request: {
        method: 'post',
        url: `/api/users/${username}/pwd`,
        data: {
          oldPassword: oldPassword,
          password: password,
          passwordRetype: passwordRetype,
        },
        headers: {'If-Match': version}
      },
    },
  };
};