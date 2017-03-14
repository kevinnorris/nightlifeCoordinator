// npm packages
import React from 'react';
import {connect} from 'react-redux';

import ClickerDisplay from './ClickerDisplay';
import {updateClicks, resetClicks} from '../duck';

const Clicker = (props) => {
  const handelClick = () => {
    props.addClick({id: props.id, token: props.token});
  };

  const handelReset = () => {
    props.reset({id: props.id, token: props.token});
  };

  return (
    <div className="Clicker">
      <ClickerDisplay
        isFetching={props.isFetching}
        clicks={props.clicks}
        handelClick={handelClick}
        handelReset={handelReset}
      />
    </div>
  );
};

Clicker.propTypes = {
  id: React.PropTypes.string.isRequired,
  clicks: React.PropTypes.number.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  token: React.PropTypes.string.isRequired,
  addClick: React.PropTypes.func.isRequired,
  reset: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  id: state.auth.user._id,
  clicks: state.clicks.clicks,
  isFetching: state.clicks.isFetching,
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  addClick: payload => dispatch(updateClicks(payload)),
  reset: payload => dispatch(resetClicks(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Clicker);
