// npm packages
import React from 'react';

// Style
import './githubDisplay.scss';

const githubDisplay = ({id, username, displayName, repositories}) => (
  <div className="githubDisplay-Profile">
    <img src="gh-mark-32px.png" alt="github logo" />
    <p>ID: {id}</p>
    <p>Username: {username}</p>
    <p>Display Name: {displayName}</p>
    <p>Repositories: {repositories}</p>
  </div>
);

githubDisplay.propTypes = {
  id: React.PropTypes.string.isRequired,
  username: React.PropTypes.string.isRequired,
  displayName: React.PropTypes.string.isRequired,
  repositories: React.PropTypes.number.isRequired,
};


export default githubDisplay;
