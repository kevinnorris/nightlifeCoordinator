// npm packages
import React from 'react';
import {Row, Col} from 'react-bootstrap';

import './center.scss';

const Center = ({children}) => (
  <div className="container Center">
    <Row>
      <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={4} lgOffset={4}>
        {children}
      </Col>
    </Row>
  </div>
);

Center.propTypes = {
  children: React.PropTypes.node,
};

export default Center;
