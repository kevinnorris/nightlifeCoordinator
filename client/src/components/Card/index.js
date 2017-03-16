// npm packages
import React from 'react';

// style
import './card.scss';

const card = ({title, url, imgUrl, alt, rating, selected, numGoing, goingClicked}) => (
  <div className="Card">
    <a className="Card-imgLink" href={url} target="_blank" rel="noopener noreferrer">
      <img className="Card-img" src={imgUrl} alt={alt} />
    </a>
    <h4 className="Card-title">{title}</h4>
    <p>{rating}</p>
    <button
      className={selected ? 'Card-goingBtn Card-btnSelected' : 'Card-goingBtn Card-btnUnselected'}
      onClick={goingClicked}
    >{numGoing} Going</button>
  </div>
);

card.propTypes = {
  title: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  imgUrl: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string.isRequired,
  rating: React.PropTypes.number.isRequired,
  selected: React.PropTypes.bool,
  numGoing: React.PropTypes.number.isRequired,
  goingClicked: React.PropTypes.func,
};

export default card;
