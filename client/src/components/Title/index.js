// npm packages
import React from 'react';

// style
import './title.scss';

const title = ({text}) => (
  <h1 className="Title-main">{text}</h1>
);

title.propTypes = {
  text: React.PropTypes.string.isRequired,
};

export default title;
