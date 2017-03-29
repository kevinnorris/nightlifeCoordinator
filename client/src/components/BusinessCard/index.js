// npm packages
import React from 'react';

import Card from '../Card';
import {ratingToFile} from '../../util/constants';

// style
import './businessCard.scss';

const BusinessCard = ({title, url, imgUrl, alt, rating, numGoing, userGoing, goingClicked}) => (
  <div className="BusinessCard">
    <Card>
      <a className="BusinessCard-imgLink" href={url} target="_blank" rel="noopener noreferrer">
        <img className="BusinessCard-img" src={imgUrl} alt={alt} />
      </a>
      <h4 className="BusinessCard-title">{title}</h4>
      <img className="BusinessCard-rating" src={ratingToFile(rating)} alt={`rating: ${rating}`} />
      <button
        className={userGoing ?
          'BusinessCard-goingBtn BusinessCard-btnSelected' :
          'BusinessCard-goingBtn BusinessCard-btnUnselected'}
        onClick={goingClicked(userGoing, title)}
      >{numGoing} Going</button>
    </Card>
  </div>
);

BusinessCard.propTypes = {
  title: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  imgUrl: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string.isRequired,
  rating: React.PropTypes.number.isRequired,
  numGoing: React.PropTypes.number.isRequired,
  userGoing: React.PropTypes.bool,
  goingClicked: React.PropTypes.func,
};

BusinessCard.defaultProps = {
  goingClicked: () => {},
  userGoing: false,
};

export default BusinessCard;
