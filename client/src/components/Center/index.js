// npm packages
import React from 'react';
import {Row, Col} from 'react-bootstrap';

import './center.scss';

const Center = ({children, large}) => (
  <div className="container Center">
    <Row>
      <Col
        xs={10}
        xsOffset={1}
        sm={large ? 10 : 8}
        smOffset={large ? 1 : 2}
        md={large ? 8 : 6}
        mdOffset={large ? 2 : 3}
        lg={large ? 6 : 4}
        lgOffset={large ? 3 : 4}
      >
        {children}
      </Col>
    </Row>
  </div>
);

Center.propTypes = {
  children: React.PropTypes.node.isRequired,
  large: React.PropTypes.bool,
};

Center.defaultProps = {
  large: false,
};

export default Center;
