import { combineReducers } from 'redux';
import authReducer from '../components/login/authReducer';
import lxcReducer from '../components/admin/lxc/lxcReducer';

export default combineReducers({
  auth: authReducer,
  lxc: lxcReducer,
});