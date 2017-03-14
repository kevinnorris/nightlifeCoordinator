// npm packages
import React from 'react';

// Style
import './welcomeMessage.scss';

const welcomeMessage = ({name}) => (
  <p className="welcomeMessage-welcome">Welcome, {name}!</p>
);

welcomeMessage.propTypes = {
  name: React.PropTypes.string.isRequired,
};

export default welcomeMessage;
