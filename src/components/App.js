import React, {Component} from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import LogoutContainer from './login/LogoutContainer'
import LoginContainer from './login/LoginContainer'
import {appRoles, routes} from "../config/appData";
import AuthorizedRoute from "./AuthorizedRoute";
import './App.css';
import LxcContainer from "./admin/lxc/LxcContainer";
import UserlistContainer from "./admin/userlist/UserlistContainer";
import LxcDetailsContainer from "./admin/lxc/details/LxcDetailsContainer";
import UserDetailsContainer
  from "./admin/userlist/details/UserDetailsContainer";
import JobsContainer from "./admin/jobs/JobsContainer";
import LxcUserContainer from "./user/lxc/LxcUserContainer";
import UserProfileContainer from "./user/profile/UserProfileContainer";
import JobsUserContainer from "./user/jobs/JobsUserContainer";
import LxcUserDetailsContainer
  from "./user/lxc/details/LxcUserDetailsContainer";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <AuthorizedRoute path ={routes.LANDING} exact component={LoginContainer} roles={[appRoles.NONE]}/>
            <AuthorizedRoute path ={routes.ADMIN_USERS} exact component={UserlistContainer} roles={[appRoles.ADMIN]}/>
            <AuthorizedRoute path ={routes.ADMIN_USER_DETAILS} exact component={UserDetailsContainer} roles={[appRoles.ADMIN]}/>
            <AuthorizedRoute path ={routes.ADMIN_LXC} exact component={LxcContainer} roles={[appRoles.ADMIN]}/>
            <AuthorizedRoute path ={routes.ADMIN_LXC_DETAILS} exact component={LxcDetailsContainer} roles={[appRoles.ADMIN]}/>
            <AuthorizedRoute path ={routes.ADMIN_JOBS} exact component={JobsContainer} roles={[appRoles.ADMIN]}/>
            <AuthorizedRoute path ={routes.CLIENT_DASHBOARD} exact component={LxcUserContainer} roles={[appRoles.CLIENT]}/>
            <AuthorizedRoute path ={routes.CLIENT_LXC_DETAILS} exact component={LxcUserDetailsContainer} roles={[appRoles.CLIENT]}/>
            <AuthorizedRoute path ={routes.CLIENT_PROFILE} exact component={UserProfileContainer} roles={[appRoles.CLIENT]} />
            <AuthorizedRoute path ={routes.CLIENT_JOBS} exact component={JobsUserContainer} roles={[appRoles.CLIENT]} />
            <AuthorizedRoute path ={routes.LOGOUT} exact component={LogoutContainer} roles={[appRoles.CLIENT, appRoles.ADMIN]}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
