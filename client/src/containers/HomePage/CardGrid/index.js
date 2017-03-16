// npm packages
import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import YelpCard from '../YelpCard';
import Card from '../../../components/Card';

// style
import './cardGrid.scss';

const CardGrid = ({CardInfo}) => {
  const cards = CardInfo.map(card => (
    <Col xs={6} md={4} key={card.title}>
      <Card
        title={card.title}
        url={card.url}
        imgUrl={card.imgUrl}
        alt={card.alt}
        rating={card.rating}
        selected={card.selected}
        numGoing={card.numGoing}
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
  CardInfo: React.PropTypes.array.isRequired,
};

export default CardGrid;
