// npm packages
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

// style
import './loginSelection.scss';


const LoginSelection = ({isLoggedIn}) => {
  if (isLoggedIn) {
    return (
      <div className="loginSelection">
        <Link to="/">Logout</Link>
      </div>
    );
  }
  return (
    <div className="loginSelection">
      <Link to="/login">Login</Link>
      <p>|</p>
      <Link to="/signup">Signup</Link>
    </div>
  );
};

LoginSelection.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(LoginSelection);
