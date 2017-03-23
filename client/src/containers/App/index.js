// npm packages
import React from 'react';

// our packages
import Footer from '../../components/Footer';

// style
import './app.scss';

export default ({children}) => (  // eslint-disable-line react/prop-types
  <div className="App-appWrapper">
    {children}
    <Footer />
  </div>
);
