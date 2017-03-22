// npm packages
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

// our packages
import {signUp} from '../duck';
import SignupCard from '../../containers/SignupCard';

import './signupPage.scss';

const mapDispatchToProps = dispatch => ({
  signUp: payload => dispatch(signUp(payload)),
  changeRoute: url => dispatch(push(url)),
});

const mapStateToProps = state => ({
  token: state.auth.token,
});

class SignupPage extends React.Component {
  static defaultProps = {
    token: null,
  }
  static propTypes = {
    token: React.PropTypes.string,
    changeRoute: React.PropTypes.func.isRequired,
    signUp: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    if (this.props.token) {
      this.props.changeRoute('/');
    }
  }

  handelSignup = (username, password) => {
    this.props.signUp({username, password});
  }

  render() {
    return (
      <SignupCard signup={this.handelSignup} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
