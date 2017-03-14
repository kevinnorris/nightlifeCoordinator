// npm packages
import React from 'react';
import {Button} from 'react-bootstrap';

// Style
import './clickerDisplay.scss';

const clickerDisplay = ({isFetching, clicks, handelClick, handelReset}) => (
  <div id="clickerDisplay">
    <h4>You have clicked the button {isFetching ? '-' : clicks} time{clicks === 1 ? '' : 's'}.</h4>
    <div className="clickerDisplay-btnContainer">
      <Button bsStyle="info" onClick={handelClick}>Click Me!</Button>
      <Button onClick={handelReset}>Reset</Button>
    </div>
  </div>
);

export default clickerDisplay;
