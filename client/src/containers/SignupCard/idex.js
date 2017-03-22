// npm packages
import React from 'react';

import Card from '../../components/Card';

// style
import './signupCard.scss';

export default class SignupCard extends React.Component {
  state = {
    email: '',
    password: '',
  }

  render() {
    return (
      <Card>
        <h1>Signup</h1>
      </Card>
    );
  }
}
