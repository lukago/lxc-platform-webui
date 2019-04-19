import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage'
import _ from "lodash";
import {appRoles, routes} from "../config/appData";

class AuthorizedRoute extends React.Component {
  state = {
    user: reactLocalStorage.getObject('user'),
  };

  getRole = () => {
    const userRoles = _.get(this.state.user, 'roles', []);

    if (userRoles.includes(appRoles.ADMIN)) return appRoles.ADMIN;
    if (userRoles.includes(appRoles.CLIENT)) return appRoles.CLIENT;

    return appRoles.NONE;
  };

  routeRender = (role, roles, Component) => props => {
    if (roles.includes(role)) {
      return <Component {...props} />
    }

    if (role === appRoles.ADMIN) {
      return <Redirect to={routes.ADMIN_DASHBOARD} />;
    }

    if (role === appRoles.CLIENT) {
      return <Redirect to={routes.CLIENT_DASHBOARD} />;
    }


    return <Redirect to={routes.LANDING} />;
  };


  render () {
      const {component: Component, roles, ...rest} = this.props;
      const renderer = this.routeRender(this.getRole(), roles, Component);

      return (
        <Route
          {...rest}
          render={renderer}
        />
      )
    }
}

export default AuthorizedRoute;