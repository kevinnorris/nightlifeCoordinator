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

  static defaultProps = {
    error: '',
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

  handelSubmit = (e) => {
    console.log('form submited');
    e.preventDefault();
    // this.handleSubmitClicked();
  }

  render() {
    return (
      <Card className="LoginCard">
        <h1 className="LoginCard-title">Login</h1>
        <form onSubmit={this.handelSubmit}>
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
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handelInputChange('password')}
          />
        </form>
        {this.props.error ? <h4 className="LoginCard-servError">{this.props.error}</h4> : ''}
        <Button className="LoginCard-input" onClick={this.handleSubmitClicked}>Submit</Button>
      </Card>
    );
  }
}
