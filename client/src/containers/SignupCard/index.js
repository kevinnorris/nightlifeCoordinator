// npm packages
import React from 'react';
import {Button} from 'react-bootstrap';

import Card from '../../components/Card';
import * as val from '../../util/validation';
import TextField from '../../components/TextField';
import {restrictedPasswords} from '../../util/constants';

// style
import './signupCard.scss';

const fieldValidations = [
  val.ruleRunner('email', 'Email Address', val.required, val.mustContain('@')),
  val.ruleRunner('password1', 'Password', val.required, val.minLength(6),
                val.cantContain(restrictedPasswords, ['email'])),
  val.ruleRunner('password2', 'Password Confirmation', val.mustMatch('password1', 'Password')),
];

export default class SignupCard extends React.Component {
  static propTypes = {
    signup: React.PropTypes.func.isRequired,
    error: React.PropTypes.string,
  }

  static defaultProps = {
    error: '',
  }

  state = {
    email: '',
    password1: '',
    password2: '',
    showErrors: false,
    validationErrors: {
      email: '',
      password1: '',
      password2: '',
    },
  }

  errorFor(field) {
    if (this.state.validationErrors[field]) {
      return this.state.validationErrors[field];
    }
    return '';
  }

  handelInputChange(field) {
    return (e) => {
      const newState = {
        ...this.state,
        [field]: e.target.value,
      };
      newState.validationErrors = val.run(newState, fieldValidations);
      this.setState(newState);
    };
  }

  handelSubmit = (e) => {
    console.log('handelSubmit fired');
    e.preventDefault();
    this.handleSubmitClicked();
  }

  handleSubmitClicked = () => {
    this.setState({
      ...this.state,
      showErrors: true,
    });
    // Check if validationErrors is empty
    if (Object.getOwnPropertyNames(this.state.validationErrors).length === 0) {
      // send to server
      this.props.signup(this.state.email, this.state.password1);
    }
  }

  render() {
    return (
      <Card>
        <h1 className="SignupCard-title">Signup</h1>
        <form onSubmit={this.handelSubmit}>
          <TextField
            name="email"
            placeHolder="Email address"
            showError={this.state.showErrors}
            text={this.state.email}
            isPassword={false}
            onFieldChange={this.handelInputChange('email')}
            errorText={this.errorFor('email')}
          />
          <TextField
            name="password1"
            placeHolder="Password"
            showError={this.state.showErrors}
            text={this.state.password1}
            isPassword
            onFieldChange={this.handelInputChange('password1')}
            errorText={this.errorFor('password1')}
          />
          <TextField
            name="password2"
            placeHolder="Confirm password"
            showError={this.state.showErrors}
            text={this.state.password2}
            isPassword
            onFieldChange={this.handelInputChange('password2')}
            errorText={this.errorFor('password2')}
          />
        </form>
        {this.props.error ? <h4 className="SignupCard-servError">{this.props.error}</h4> : ''}
        <Button onClick={this.handleSubmitClicked}>Submit</Button>
      </Card>
    );
  }
}
