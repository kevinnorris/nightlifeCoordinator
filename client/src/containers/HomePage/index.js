// npm packages
import React from 'react';
// import {connect} from 'react-redux';

import Card from '../../components/Card';
import CardGrid from './CardGrid';

// style
import './home.scss';

const HomePage = props => (
  <div className="HomePage">
    <h1>Home</h1>
    <CardGrid
      CardInfo={[
        {
          title: 'Title',
          url: 'https://yelp.com',
          imgUrl: 'Yelp_trademark_RGB.png',
          alt: 'yelp',
          description: 'yelp image',
          selected: false,
          numGoing: 0,
        },
        {
          title: 'Title1',
          url: 'https://yelp.com',
          imgUrl: 'Yelp_trademark_RGB.png',
          alt: 'yelp',
          description: 'yelp image',
          selected: false,
          numGoing: 0,
        },
        {
          title: 'Title2',
          url: 'https://yelp.com',
          imgUrl: 'Yelp_trademark_RGB.png',
          alt: 'yelp',
          description: 'yelp image',
          selected: false,
          numGoing: 0,
        },
        {
          title: 'Title3',
          url: 'https://yelp.com',
          imgUrl: 'Yelp_trademark_RGB.png',
          alt: 'yelp',
          description: 'yelp image',
          selected: false,
          numGoing: 0,
        },
      ]}
    />
  </div>
);

// HomePage.propTypes = {
//   name: React.PropTypes.string.isRequired,
// };

// const mapStateToProps = state => ({
//   name: state.auth.user.github.displayName,
// });

// export default connect(mapStateToProps)(HomePage);
export default HomePage;
