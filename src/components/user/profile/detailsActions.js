import {FETCH_USER, UPDATE_PASSWORD_USER, UPDATE_USER} from "./types";

export const fetchUser = () => {
  return {
    type: FETCH_USER,
    payload: {
      request: {
        method: 'get',
        url: `/api/users/me`,
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
        url: `/api/users/me`,
        data: {
          ...user,
        },
        headers: {'If-Match': user.version}
      },
    },
  };
};

export const updateUserPassowrd = (oldPassword, password, passwordRetype, version) => {
  return {
    type: UPDATE_PASSWORD_USER,
    payload: {
      request: {
        method: 'post',
        url: `/api/users/me/pwd`,
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