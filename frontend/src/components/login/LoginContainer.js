import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import { reactLocalStorage } from 'reactjs-localstorage';
import LoginScreen from './LoginScreen';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: '',
        password: '',
      }
    };
  }

  handleChange = (name, value) => {
    const { credentials } = this.state;

    credentials[name] = value;

    this.setState(prevProps => ({
      ...prevProps,
      credentials,
    }));
  };

  componentDidUpdate(prevProps) {
    this.handleTokenFetched(!prevProps.token && this.props.token);
    this.handleServerError(prevProps.error !== this.props.error);
    this.handleUserFetched(!prevProps.user && this.props.user);
  }

  startAgain = () => {
    this.props.restartLogin();
  };

  startLogin = async (event) => {
    event.preventDefault();
    this.props.startLogin(this.state.credentials);
    return true;
  };

  handleUserFetched(isUserAvailable) {
    if (isUserAvailable) {
      this.props.saveUserInLocalStorage(this.props.user);
      if (this.props.redirect) {
        window.location = '/';
      }
    }
  }

  handleTokenFetched(isTokenAvailable) {
    if (isTokenAvailable) {
      reactLocalStorage.set('token', this.props.token);
      this.props.fetchCurrentUser();
    }
  }

  handleServerError(isErrorChanged) {
    if (isErrorChanged && this.props.error) {
      this.props.loginFailed('Login failed');
    }
  }

  render() {
    const loginScreenProps = {
      loginDisabled: this.props.spinnerVisible,
      credentials: this.state.credentials,
      startLogin: this.startLogin,
      restartLogin: this.startAgain,
      handleChange: this.handleChange,
      children: this.props.children,
      spinnerVisible: this.props.spinnerVisible,
      loginFailedMessage: this.props.loginFailedMessage,
    };
    return (
        <Fragment>
            <LoginScreen {...loginScreenProps} />
        </Fragment>
    );
  }
}

LoginContainer.propTypes = {
  redirect: PropTypes.bool,
};

LoginContainer.defaultProps = {
  redirect: true,
};

const mapStateToProps = state => {
  return {
    spinnerVisible: state.auth.inProgress,
    loginFailedMessage: state.auth.loginFailedMessage,
    user: state.auth.user,
    token: state.auth.token,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, authActions)(LoginContainer);
