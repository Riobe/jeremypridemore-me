import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Navbar from './home/Navbar';
import AboutTile from './home/AboutTile';

import Creation from './creation/Creation';

const debug = require('debug')('jeremypridemore-me:App');

class App extends Component {
  state = {
    user: null
  }

  login = (userName, password) => {
    if (typeof userName === 'object') {
      userName = userName.userName;
      password = userName.password;
    }

    debug(`Trying to login as: ${userName}`);
    axios.post('/api/login', {
      userName,
      password,
    }).then(res => {
      debug('Login response:', res);
      if (res.status !== 200) {
        throw res;
      }

      this.setState({ user: userName }, () => {
        window.toastr.success(`Welcome ${userName}!`, 'Login success');
      });
    }).catch(() => {
      window.toastr.error('User name or password incorrect.', 'Login failed');
    });
  }

  getCurrentUser = () => {
    axios.get('/api/login').then(res => {
      if (!res.data.user) {
        debug('Got a success from GET - /api/login with no user.');
        return;
      }

      this.setState({ user: res.data.user }, () => {
        debug(`Logged in as: ${this.state.user}`);
      });
    }).catch(() => {
      window.toastr.error('There was an error talking to the server', 'API Error');
    });
  }

  logout = () => {
    if (!this.state.user) {
      debug('logout attempt with user not being set.');
      return;
    }

    debug('Clearing user and making logout call.');
    // These can both be done in parallel.
    this.setState({ user: null });
    axios.post('/api/logout');
  }

  registerUser = (userName, password, email) => {
    if (!userName || !password || !email) {
      debug('Can\'t register user with incomplete data:', { userName, password, email });
      return;
    }

    axios
      .post('/api/users', { userName, password, email })
      .then(res => {
        if (res.data.status === 'success') {
          this.login(userName, password);
        }
      });
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  render() {
    return (
      <Router>
        <div id="App">
          <Navbar
            title="Jeremy Pridemore"
            user={this.state.user}
            onLogin={event => this.login(event.userName, event.password)}
            onRegister={event => this.registerUser(event.userName, event.password, event.email)}
            onLogout={this.logout}
          />
          <Route path="/" exact={true} render={() => (
            <div id="home" className="container m-0 p-3">
              <div className="row justify-content-center">
                <div className="col col-sm-10 col-md-8 col-lg-6">
                  <AboutTile />
                </div>
              </div>
            </div>
          )} />
          <Route path="/creation" component={Creation} />
        </div>
      </Router>
    );
  }
}

export default App;
