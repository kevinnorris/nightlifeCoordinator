// npm packages
import React from 'react';
import {Button, FormControl} from 'react-bootstrap';

import Card from '../../components/Card';

import './loginCard.scss';

export default class LoginCard extends React.Component {
  static propTypes = {
    error: React.PropTypes.string,
    login: React.PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  handelInputChange(field) {
    return (e) => {
      const newState = {
        ...this.state,
        [field]: e.target.value,
      };
      this.setState(newState);
    };
  }

  handleSubmitClicked = () => {
    this.props.login(this.state.email, this.state.password);
  }

  render() {
    return (
      <Card className="LoginCard">
        <h1 className="LoginCard-title">Login</h1>
        <form>
          <FormControl
            className="LoginCard-input"
            name="email"
            type="text"
            placeholder="Email address"
            value={this.state.email}
            onChange={this.handelInputChange('email')}
          />
          <FormControl
            className="LoginCard-input"
            name="password"
            type="text"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handelInputChange('password')}
          />
        </form>
        {this.props.error ? <h3 className="LoginCard-servError">{this.props.error}</h3> : ''}
        <Button className="LoginCard-input" onClick={this.handleSubmitClicked}>Submit</Button>
      </Card>
    );
  }
}
