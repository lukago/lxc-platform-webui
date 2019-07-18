export const links = {
  BASE_URL: process.env.REACT_APP_API_URL,
};

export const appRoles = {
  ADMIN: 'ROLE_ADMIN',
  CLIENT: 'ROLE_CLIENT',
  NONE: 'ROLE_NONE',
};

export const routes = {
  LANDING: '/',
  ADMIN_USERS: '/admin/users',
  ADMIN_JOBS: '/admin/jobs/:pageNr',
  ADMIN_LXC: '/admin/lxc',
  ADMIN_LXC_DETAILS: '/admin/lxc/:lxcName',
  ADMIN_USER_DETAILS: '/admin/users/:username',
  ADMIN_PROFILE: '/admin/profile',
  CLIENT_DASHBOARD: '/client/dashboard',
  CLIENT_LXC_DETAILS: '/client/lxc/:lxcName',
  CLIENT_JOBS: '/client/jobs/:pageNr',
  CLIENT_PROFILE: '/client/profile',
  LOGOUT: '/logout'
};
