import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage'
import jwtDecode from 'jwt-decode'
import LogoutContainer from './login/LogoutContainer'
import LoginContainer from './login/LoginContainer'
import UserContainer from './user/UserContainer'
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: reactLocalStorage.get('token'),
      user: reactLocalStorage.get('token') != null ? jwtDecode(reactLocalStorage.get('token')) : null,
    }
  }

  render() {
    if (!this.state.user) {
      return (
          <BrowserRouter>
            <div>
              <Switch>
                <Route path ="/" exact component={LoginContainer}/>
              </Switch>
            </div>
          </BrowserRouter>
      );
    }

    if (this.state.user) {
      return (
          <BrowserRouter>
            <div>
              <Switch>
                <Route path ="/logout" component={LogoutContainer}/>
                <Route path ="/" exact component={UserContainer}/>
              </Switch>
            </div>
          </BrowserRouter>
      )
    }
  }
}

export default App;
