// npm packages
import React from 'react';
import {connect} from 'react-redux';

// import Clicker from './Clicker';
import WelcomeMessage from './WelcomeMessage';
import HeaderContainer from '../../Auth/headerContainer';
import Title from '../../components/Title';
import Clicker from './Clicker';

const HomePage = props => (
  <div className="HomePage">
    <WelcomeMessage name={props.name} />
    <HeaderContainer pageName="Profile" path="/profile" />
    <Title text="Home Page" />
    <Clicker />
  </div>
);

HomePage.propTypes = {
  name: React.PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  name: state.auth.user.github.displayName,
});

export default connect(mapStateToProps)(HomePage);
