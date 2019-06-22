import { Component } from 'react';
import { connect } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import { handleLogout } from './authActions';
import { routes } from "../../config/appData";

class LogoutContainer extends Component {
  componentDidMount() {
    this.props.handleLogout();
  }

  componentDidUpdate() {
    const token = reactLocalStorage.get('token');
    if (!!token && this.props.loggedOut) {
      reactLocalStorage.clear();
      window.location = routes.LANDING;
    }
  }

  render() {
    return null;
  }
}

function mapStateToProps({ auth }) {
  return {
    loggedOut: auth.loggedOut,
  };
}

export default connect(mapStateToProps, { handleLogout })(LogoutContainer);
