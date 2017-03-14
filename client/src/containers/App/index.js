// npm packages
import React from 'react';

// style
import './app.scss';

export default ({children}) => (  // eslint-disable-line react/prop-types
  <div className="container App-appWrapper">
    {children}
  </div>
);
