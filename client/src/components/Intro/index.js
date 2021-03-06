// npm packages
import React from 'react';

import Center from '../Center';
import Card from '../Card';

import './intro.scss';

export default () => (
  <Center large>
    <Card>
      <h1 className="text-center Intro-title">Search Your location!</h1>
      <h2 className="text-center Intro-subTitle">Gauge tonights bar scene and RSVP!</h2>
      <p className="text-center">Login/Signup to RSVP</p>
    </Card>
  </Center>
);
