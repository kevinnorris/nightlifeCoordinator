// npm packages
import React from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

import Card from '../../components/Card';

// style
import './signupCard.scss';

const fieldValidations = [
  ruleRunner('email', 'Email Address', required),
  ruleRunner('password1', 'Password', required, minLength(6)),
  ruleRunner('password2', 'Password Confirmation', mustMatch('password1', 'Password')),
];

export default class SignupCard extends React.Component {
  state = {
    email: '',
    password1: '',
    password2: '',
    showErrors: false,
    validationErrors: {},
  }

  handelInputChange(field) {
    return (e) => {
      const newState = {
        ...this.state,
        [field]: e.target.value,
        validationErrors: run(newState, fieldValidations),
      };
      this.setState(newState);
    };
  }

  render() {
    return (
      <Card>
        <h1>Signup</h1>
        <form>
          <FormGroup controlId="email" validationState={null}>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              name="email"
              type="text"
              placeholder="Your Email"
              value={this.state.email}
              onChange={this.handelInputChange('email')}
            />
            {this.state.showErrors ? <HelpBlock>{this.state.validationErrors.email}</HelpBlock> : ''}
          </FormGroup>
        </form>
      </Card>
    );
  }
}
