// npm packages
import React from 'react';

// style
import './card.scss';

const card = ({children}) => (
  <div className="Card">
    {children}
  </div>
);

card.propTypes = {
  children: React.PropTypes.node,
};

export default card;
