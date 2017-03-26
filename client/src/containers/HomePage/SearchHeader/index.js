// npm packages
import React from 'react';
import {Link} from 'react-router';
import {InputGroup, FormGroup, FormControl, Button, Glyphicon} from 'react-bootstrap';

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
          <form className="SearchHeader-searchForm">
            <FormGroup bsStyle="SearchHeader" >
              <InputGroup>
                <FormControl type="text" bsStyle="SearchHeader" />
                <InputGroup.Button>
                  <Button bsStyle="SearchHeader"><Glyphicon glyph="search" /></Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </form>
          <LoginSelection />
        </div>
      </div>
    );
  }
}

export default Header;
