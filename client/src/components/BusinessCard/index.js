// npm packages
import React from 'react';

import Card from '../Card';

// style
import './businessCard.scss';

const BusinessCard = ({title, url, imgUrl, alt, rating, selected, numGoing, goingClicked}) => (
  <Card>
    <a className="BusinessCard-imgLink" href={url} target="_blank" rel="noopener noreferrer">
      <img className="BusinessCard-img" src={imgUrl} alt={alt} />
    </a>
    <h4 className="BusinessCard-title">{title}</h4>
    <p>{rating}</p>
    <button
      className={selected ?
        'BusinessCard-goingBtn BusinessCard-btnSelected' :
        'BusinessCard-goingBtn BusinessCard-btnUnselected'}
      onClick={goingClicked}
    >{numGoing} Going</button>
  </Card>
);

BusinessCard.propTypes = {
  title: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  imgUrl: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string.isRequired,
  rating: React.PropTypes.number.isRequired,
  selected: React.PropTypes.bool,
  numGoing: React.PropTypes.number.isRequired,
  goingClicked: React.PropTypes.func,
};

export default BusinessCard;
