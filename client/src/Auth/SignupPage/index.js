// npm packages
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

// our packages
import {signUp} from '../duck.js';
import SignupCard from '../../containers/SignupCard';
import BasicHeader from '../../components/BasicHeader';
import Center from '../../components/Center';

import './signupPage.scss';

const mapDispatchToProps = dispatch => ({
  signUp: payload => dispatch(signUp(payload)),
  changeRoute: url => dispatch(push(url)),
});

const mapStateToProps = state => ({
  token: state.auth.token,
  error: state.auth.error,
});

class SignupPage extends React.Component {
  static defaultProps = {
    token: null,
    error: null,
  }
  static propTypes = {
    token: React.PropTypes.string,
    error: React.PropTypes.string,
    changeRoute: React.PropTypes.func.isRequired,
    signUp: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    if (this.props.token) {
      this.props.changeRoute('/');
    }
  }

  handelSignup = (email, password) => {
    this.props.signUp({email, password});
  }

  render() {
    return (
      <div>
        <BasicHeader appName="BarSVP" />
        <Center>
          <SignupCard signup={this.handelSignup} error={this.props.error} />
        </Center>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
