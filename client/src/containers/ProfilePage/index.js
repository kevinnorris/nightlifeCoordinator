// npm packages
import React from 'react';
import {connect} from 'react-redux';

import HeaderContainer from '../../Auth/headerContainer';
import GithubDisplay from './githubDisplay';

const ProfilePage = props => (
  <div id="profilePage">
    <HeaderContainer pageName="Home" path="/" />
    <GithubDisplay
      id={props.id}
      username={props.username}
      displayName={props.displayName}
      repositories={props.repositories}
    />
  </div>
);

const mapStateToProps = state => ({
  id: state.auth.user.github.id,
  username: state.auth.user.github.username,
  displayName: state.auth.user.github.displayName,
  repositories: state.auth.user.github.publicRepos,
});

export default connect(mapStateToProps)(ProfilePage);
