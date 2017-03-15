// npm packages
import React from 'react';

// style
import './card.scss';

export default ({title, url, imgUrl, alt, description, Going}) => (
  <div className="Card">
    <a className="Card-imgLink" href={url} target="_blank" rel="noopener noreferrer">
      <img className="Card-img" src={imgUrl} alt={alt} />
    </a>
    <h4 className="Card-title">{title}</h4>
    <p>{description}</p>
  </div>
);
