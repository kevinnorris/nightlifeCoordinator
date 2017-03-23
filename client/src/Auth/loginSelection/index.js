// npm packages
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

// This breaks auth reducer because loginSelection is used in basic header
// which is used in app before children
import {logoutUser} from '../duck';

// style
import './loginSelection.scss';

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
});


const LoginSelection = ({isLoggedIn, logout}) => {
  if (isLoggedIn) {
    return (
      <div className="loginSelection">
        <Link to="/" onClick={logout}>Logout</Link>
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
  logout: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginSelection);
