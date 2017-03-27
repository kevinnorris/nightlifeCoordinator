// npm packages
import React from 'react';
import {connect} from 'react-redux';

import CardGrid from './CardGrid';
import {getYelpData} from './duck';
import SearchHeader from './SearchHeader';

// style
import './home.scss';

const mapStateToProps = state => ({
  bars: state.yelpData.bars,
  isFetching: state.yelpData.isFetching,
  searchTerm: state.yelpData.searchTerm,
});

const mapDispatchToProps = dispatch => ({
  getYelpData: payload => dispatch(getYelpData(payload)),
});

class HomePage extends React.Component {
  static defaultProps = {
    bars: null,
  }
  static propTypes = {
    bars: React.PropTypes.array,
    isFetching: React.PropTypes.bool.isRequired,
    searchTerm: React.PropTypes.string.isRequired,
    getYelpData: React.PropTypes.func.isRequired,
  }

  handelSearch = (searchTerm) => {
    this.props.getYelpData({searchTerm});
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
        <SearchHeader appName="BarSVP" search={this.handelSearch} />
        {this.props.searchTerm && !this.props.isFetching ? <h1 className="text-center">{this.props.searchTerm}</h1> : ''}
        {this.props.bars && !this.props.isFetching ? <CardGrid CardInfo={cardFormatedData} /> : ''}
        {this.props.isFetching ? <p className="text-center">Loading</p> : ''}
      </div>
    );
  }
}

// export default connect(mapStateToProps)(HomePage);
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
