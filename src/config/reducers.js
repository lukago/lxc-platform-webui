import { combineReducers } from 'redux';
import authReducer from '../components/login/authReducer';
import lxcReducer from '../components/admin/lxc/lxcReducer';
import lxcReducerUser from '../components/user/lxc/lxcReducer';
import lxcDetailsReducerUser from '../components/user/lxc/details/detailsReducer';
import detailsReducer from "../components/admin/lxc/details/detailsReducer";
import detailsReducerUsr from "../components/admin/userlist/details/detailsReducer";
import userlistReducer from "../components/admin/userlist/userlistReducer";
import jobsReducer from "../components/admin/jobs/jobsReducer";

export default combineReducers({
  auth: authReducer,
  lxc: lxcReducer,
  lxcUser: lxcReducerUser,
  lxcUserDetails: lxcDetailsReducerUser,
  details: detailsReducer,
  userlist: userlistReducer,
  detailsUsr: detailsReducerUsr,
  jobs: jobsReducer,
});