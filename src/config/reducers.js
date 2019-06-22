import { combineReducers } from 'redux';
import authReducer from '../components/login/authReducer';
import lxcReducer from '../components/admin/lxc/lxcReducer';
import detailsReducer from "../components/admin/lxc/details/detailsReducer";
import detailsReducerUsr from "../components/admin/userlist/details/detailsReducer";
import userlistReducer from "../components/admin/userlist/userlistReducer";

export default combineReducers({
  auth: authReducer,
  lxc: lxcReducer,
  details: detailsReducer,
  userlist: userlistReducer,
  detailsUsr: detailsReducerUsr,
});