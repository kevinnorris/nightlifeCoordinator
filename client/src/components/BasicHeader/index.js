// npm packages
import React from 'react';
import {Link} from 'react-router';

// style
import './header.scss';

const Header = ({appName}) => (
  <div className="Header container">
    <Link to="/"><h1>{appName}</h1></Link>
  </div>
);

Header.propTypes = {
  appName: React.PropTypes.string.isRequired,
};

export default Header;
