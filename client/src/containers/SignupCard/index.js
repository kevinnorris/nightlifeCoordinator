// npm packages
import React from 'react';
import {Button} from 'react-bootstrap';

import Card from '../../components/Card';
import * as val from '../../util/validation';
import TextField from '../../components/TextField';

// style
import './signupCard.scss';

const fieldValidations = [
  val.ruleRunner('email', 'Email Address', val.required),
  val.ruleRunner('password1', 'Password', val.required, val.minLength(6)),
  val.ruleRunner('password2', 'Password Confirmation', val.mustMatch('password1', 'Password')),
];

export default class SignupCard extends React.Component {
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
      console.log(newState);
      this.setState(newState);
    };
  }

  handleSubmitClicked = () => {
    console.log('handelSubmitClicked');
    console.log(this.state);
    this.setState({
      ...this.state,
      showErrors: true,
    });
    // Check if errors exist
    // ... continue submitting data to server
  }

  render() {
    return (
      <Card>
        <h1>Signup</h1>
        <form>
          <TextField
            name="email"
            placeHolder="Email address"
            showError={this.state.showErrors}
            text={this.state.email}
            onFieldChange={this.handelInputChange('email')}
            errorText={this.errorFor('email')}
          />
          <TextField
            name="password1"
            placeHolder="Password"
            showError={this.state.showErrors}
            text={this.state.password1}
            onFieldChange={this.handelInputChange('password1')}
            errorText={this.errorFor('password1')}
          />
          <TextField
            name="password2"
            placeHolder="Confirm password"
            showError={this.state.showErrors}
            text={this.state.password2}
            onFieldChange={this.handelInputChange('password2')}
            errorText={this.errorFor('password2')}
          />
        </form>
        <Button onClick={this.handleSubmitClicked}>Submit</Button>
      </Card>
    );
  }
}
