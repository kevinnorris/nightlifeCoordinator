// npm packages
import React from 'react';
import {connect} from 'react-redux';

import CardGrid from './CardGrid';
import {getYelpData} from './duck';

// style
import './home.scss';

class HomePage extends React.Component {
  static defaultProps = {
    bars: null,
  }
  static propTypes = {
    bars: React.PropTypes.array,
    isFetching: React.PropTypes.bool.isRequired,
    getYelpData: React.PropTypes.func.isRequired,
  }
  componentWillMount() {
    if (!this.props.bars) {
      this.props.getYelpData();
    }
  }

  render() {
    let cardFormatedData;
    if (this.props.bars) {
      cardFormatedData = this.props.bars.map(bar => ({
        title: bar.name,
        url: bar.url,
        imgUrl: bar.imgUrl,
        alt: bar.name,
        rating: bar.rating,
        selected: false,
        numGoing: 0,
      }));
    }

    return (
      <div className="HomePage">
        <h1 className="text-center">Auckland</h1>
        {this.props.bars ? <CardGrid CardInfo={cardFormatedData} /> : ''}
        {this.props.isFetching ? <p className="text-center">Loading</p> : ''}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bars: state.yelpData.bars,
  isFetching: state.yelpData.isFetching,
});

const mapDispatchToProps = dispatch => ({
  getYelpData: () => dispatch(getYelpData()),
});

// export default connect(mapStateToProps)(HomePage);
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
