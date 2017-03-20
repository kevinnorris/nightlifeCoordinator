// npm packages
import React from 'react';
import {Link} from 'react-router';

import LoginSelection from '../../Auth/loginSelection';

// style
import './header.scss';

const Header = ({appName}) => (
  <div className="Header">
    <div className="container">
      <Link to="/"><h1>{appName}</h1></Link>
      <LoginSelection />
    </div>
  </div>
);

Header.propTypes = {
  appName: React.PropTypes.string.isRequired,
};

export default Header;
