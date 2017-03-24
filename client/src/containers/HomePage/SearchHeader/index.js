// npm packages
import React from 'react';
import {Link} from 'react-router';

import LoginSelection from '../../../Auth/loginSelection';

// style
import './searchHeader.scss';

class Header extends React.Component {
  static propTypes = {
    appName: React.PropTypes.string.isRequired,
  }

  state = {
    searchTerm: '',
  }

  handelsearchChange = (e) => {
    this.setState({searchTerm: e.target.value});
  }

  render() {
    return (
      <div className="SearchHeader">
        <div className="container SearchHeader-row">
          <Link to="/"><h1>{this.props.appName}</h1></Link>
          <input
            className="SearchHeader-search"
            type="text" placeholder="Search"
            value={this.state.searchTerm}
            onChange={this.handelsearchChange}
          />
          <LoginSelection />
        </div>
      </div>
    );
  }
}

export default Header;
