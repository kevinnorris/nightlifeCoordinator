// npm packages
import React from 'react';

// style
import './footer.scss';

export default () => (
  <div className="Footer">
    <p className="Footer-attribution">Powerd by <a href="https://yelp.com/" target="_blank" rel="noopener noreferrer">
      <img src="Yelp_trademark_RGB.png" alt={'Yelp trademark'} height="40" />
    </a></p>
    <a href="https://github.com/kevinnorris/nightlifeCoordinator" target="_blank" rel="noopener noreferrer">
      Github Repo
    </a>
  </div>
);
