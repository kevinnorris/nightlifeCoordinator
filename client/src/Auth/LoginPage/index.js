// npm packages
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import popupTools from 'popup-tools';
import {Button} from 'react-bootstrap';
// import {Link} from 'react-router';

// our packages
import BasicHeader from '../../components/BasicHeader';
import {loginSuccess, login} from '../duck2';
import LoginCard from '../../containers/LoginCard';
import Center from '../../components/Center';

import './login.scss';

const mapDispatchToProps = dispatch => ({
  loginSuccess: payload => dispatch(loginSuccess(payload)),
  login: payload => dispatch(login(payload)),
  changeRoute: url => dispatch(push(url)),
});

const mapStateToProps = state => ({
  token: state.auth.token,
  error: state.auth.error,
});

class Login extends React.Component {
  static defaultProps = {
    token: null,
    error: '',
  }
  static propTypes = {
    token: React.PropTypes.string,
    error: React.PropTypes.string,
    changeRoute: React.PropTypes.func.isRequired,
    loginSuccess: React.PropTypes.func.isRequired,
    login: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    // If we already have a token, redirect to home page
    // happens before component mounts
    if (this.props.token) {
      this.props.changeRoute('/');
    }
  }

  handelGithubLogin = () => {
    popupTools.popup('/auth/github', 'Github Connect', {}, (err, response) => {
      if (err) {
        alert(err.message);
      } else {
        if (response.success) {
          this.props.loginSuccess({token: response.token, user: response.user});
          // redirect to home
          this.props.changeRoute('/');
        } else {
          alert('Error logging into github.');
        }
      }
    });
  }

  handelLocalLogin = (email, password) => {
    this.props.login({email, password});
  }

  render() {
    return (
      <div>
        <BasicHeader appName="BarSVP" />
        <Center>
          <LoginCard error={this.props.error} login={this.handelLocalLogin} />
          <Button bsStyle="info" className="socialButton" onClick={this.handelGithubLogin}>
            <img className="logo" src="github_32px.png" alt="github logo" />
            <p>Login With Github</p>
          </Button>
        </Center>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
