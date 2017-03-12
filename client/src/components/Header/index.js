// npm packages
import React from 'react';
import {Link} from 'react-router';

// style
import './header.scss';

const Header = ({pageName, path, logout}) => (
  <div className="Header-linkContainer">
    <Link to={path}>{pageName}</Link>
    <p id="Header-menuDivide">|</p>
    <Link to="/login" onClick={logout}>Logout</Link>
  </div>
);

export default Header;
