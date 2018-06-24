import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';
import githubLogo from './GitHub-Mark-Light-32px.png';

const GITHUB_URL = 'https://github.com/Riobe/jeremypridemore-me';
const debug = require('debug')('jeremypridemore-me:components:Navbar');

export default class Navbar extends Component {
  state = {
    loggingIn: false,
    registering: false,
    userName: '',
    password: '',
    email: ''
  }

  handleRegister = e => {
    e.stopPropagation();
    const newState = { registering: !this.state.registering };

    if (this.state.loggingIn) {
      newState.loggingIn = false;
    }

    this.setState(newState);
  }

  handleLogin = e => {
    e.stopPropagation();
    const newState = { loggingIn: !this.state.loggingIn };

    if (this.state.registering) {
      newState.registering = false;
    }

    this.setState(newState);
  }

  handleChange = prop => {
    return event => this.setState({[prop]: event.target.value});
  }

  submitAuth = e => {
    e.preventDefault();

    if (!this.props.onLogin) {
      debug('onLogin not defined');
      return;
    }

    const { userName, password, email } = this.state;
    if (!userName || !password) {
      debug('Either userName or password is falsey.');
      return;
    }

    if (this.state.email) {
      debug('Calling onRegister.');
      this.props.onRegister({
        userName,
        password,
        email
      });
    } else {
      debug('Calling onLogin.');
      this.props.onLogin({
        userName,
        password
      });
    }

    this.clearAuth();
  }

  clearAuth = () => {
    this.setState({
      loggingIn: false,
      registering: false,
      userName: '',
      password: '',
      email: '',
    });
  }

  render() {
    const { title, user, onLogout } = this.props;
    const { loggingIn, registering } = this.state;

    return (
      <nav id="navbar" className="navbar navbar-expand-md navbar-dark bg-dark">
        <Link className="navbar-brand" id="page-title" to="/">{title}</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-content"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navbar-content" className="collapse navbar-collapse" onClick={this.clearAuth}>
          <ul className="navbar-nav d-block d-md-none">
            <li className="nav-item">
              <a className="nav-link" href={GITHUB_URL} target="_blank">Source Code</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/creation">Creation</Link>
            </li>
            {!user &&
              <Fragment>
                <li className="nav-item">
                  <a id="register-link-menu" className="nav-link" onClick={this.handleRegister}>Register</a>
                </li>
                <li className="nav-item">
                  <a id="login-link-menu" className="nav-link" onClick={this.handleLogin}>Login</a>
                </li>
              </Fragment>
            }
            {user &&
              <li className="nav-item">
                <a id="logout-link-menu" className="nav-link" onClick={onLogout}>Logout</a>
              </li>
            }
          </ul>

          <ul className="navbar-nav d-none d-md-block">
            <li className="nav-item">
              <Link className="nav-link" to="/creation">Creation</Link>
            </li>
          </ul>

          <a id="github" className="ml-auto d-none d-md-block" href={GITHUB_URL} target="_blank">
            <img src={githubLogo} alt="github repository" />
          </a>

          {!user && !loggingIn && !registering &&
            <div id="not-logged-in" className="d-none d-md-flex">
              <a id="register-link" onClick={this.handleRegister}>register</a>

              <div className="vertical-seperator"></div>

              <a id="login-link" onClick={this.handleLogin}>login</a>
            </div>
          }

          {user &&
            <div id="logged-in" className="d-none d-md-flex">
              <div id="current-user">{user}</div>

              <div className="vertical-seperator"></div>

              <a id="logout-link" onClick={() => {
                debug('Logging out.');
                onLogout();
              }}>Logout</a>
            </div>
          }

          {(loggingIn || registering) &&
            <form id="auth-form">
              <div className="form-row">
                <div className="col">
                  <input
                    id="userName-input"
                    className="form-control form-control-sm"
                    type="text"
                    placeholder="User Name"
                    aria-label="User Name"
                    value={this.state.userName}
                    onChange={this.handleChange('userName')}
                    autoFocus
                  />
                </div>
                <div className="col">
                  <input
                    id="password-input"
                    className="form-control form-control-sm"
                    type="password"
                    placeholder="Password"
                    aria-label="Password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                  />
                </div>
                  {registering &&
                    <div className="col">
                      <input
                        id="email-input"
                        className="form-control form-control-sm"
                        type="email"
                        placeholder="Email"
                        aria-label="Email"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                      />
                    </div>
                  }
              </div>

              <div className="form-row justify-content-end">
                <button
                  type="submit"
                  className="btn btn-light btn-sm"
                  onClick={this.submitAuth}
                >Submit</button>
                <button
                  type="button"
                  className="btn btn-light btn-sm"
                  onClick={e => { e.preventDefault(); this.clearAuth(); }}
                >Cancel</button>
              </div>
            </form>
          }
        </div>
      </nav>
    );
  }
};
