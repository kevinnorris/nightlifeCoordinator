// npm packages
import React from 'react';
import {Link} from 'react-router';
import {InputGroup, FormGroup, FormControl, Button, Glyphicon} from 'react-bootstrap';
import {bootstrapUtils} from 'react-bootstrap/lib/utils';

import LoginSelection from '../../../Auth/loginSelection';

// style
import './searchHeader.scss';

bootstrapUtils.addStyle(Button, 'SearchHeader');

class Header extends React.Component {
  static propTypes = {
    appName: React.PropTypes.string.isRequired,
    search: React.PropTypes.func.isRequired,
  }

  state = {
    searchTerm: '',
  }

  handelsearchChange = (e) => {
    this.setState({searchTerm: e.target.value});
  }

  handelSubmit = (e) => {
    e.preventDefault();
    this.handelSearch();
  }

  handelSearch = () => {
    if (this.state.searchTerm.length > 0) {
      this.props.search(this.state.searchTerm);
    }
  }

  render() {
    return (
      <div className="SearchHeader">
        <div className="container SearchHeader-row">
          <Link to="/"><h1>{this.props.appName}</h1></Link>
          <form className="SearchHeader-searchForm" onSubmit={this.handelSubmit}>
            <FormGroup bsStyle="SearchHeader" >
              <InputGroup>
                <FormControl
                  type="text"
                  bsStyle="SearchHeader"
                  placeholder="Search"
                  onChange={this.handelsearchChange}
                />
                <InputGroup.Button>
                  <Button bsStyle="SearchHeader"><Glyphicon glyph="search" onClick={this.handelSearch} /></Button>
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
