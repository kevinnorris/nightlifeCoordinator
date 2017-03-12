// npm packages
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

// style
import './profile.scss';
import {logoutUser} from '../../store/actions';
import Header from '../../components/Header';

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
});

const mapStateToProps = state => ({
  id: state.auth.user.github.id,
  username: state.auth.user.github.username,
  displayName: state.auth.user.github.displayName,
  repositories: state.auth.user.github.publicRepos,
});

const Profile = ({id, username, displayName, repositories, logout}) => (
  <div className="Profile">
    <Header pageName="Home" path="/" logout={logout} />
    <div className="Profile-githubProfile">
      <img src="gh-mark-32px.png" alt="github logo" />
      <p>ID: {id}</p>
      <p>Username: {username}</p>
      <p>Display Name: {displayName}</p>
      <p>Repositories: {repositories}</p>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
