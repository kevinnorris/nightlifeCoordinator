// npm packages
import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import BusinessCard from '../../../components/BusinessCard';

// style
import './cardGrid.scss';

const CardGrid = ({CardInfo, goingClicked}) => {
  const cards = CardInfo.map(card => (
    <Col sm={6} md={4} lg={3} key={card.title}>
      <BusinessCard
        title={card.title}
        url={card.url}
        imgUrl={card.imgUrl}
        alt={card.alt}
        rating={card.rating}
        numGoing={card.numGoing}
        userGoing={card.userGoing}
        goingClicked={goingClicked}
      />
    </Col>
  ));

  return (
    <Grid>
      <Row>
        {cards}
      </Row>
    </Grid>
  );
};

CardGrid.propTypes = {
  CardInfo: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  goingClicked: React.PropTypes.func,
};

CardGrid.defaultProps = {
  goingClicked: () => {},
};

export default CardGrid;
