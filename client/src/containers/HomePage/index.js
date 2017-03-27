// npm packages
import React from 'react';
import {connect} from 'react-redux';

import CardGrid from './CardGrid';
import {getYelpData} from './duck';
import SearchHeader from './SearchHeader';
import Loading from '../../components/Loading';

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
    let cardFormatedData = null;
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

    let cardGrid = null;
    if (!this.props.isFetching && cardFormatedData) {
      cardGrid = (<CardGrid CardInfo={cardFormatedData} />);
    }

    let searchTerm = null;
    if (!this.props.isFetching && this.props.searchTerm) {
      searchTerm = (<h1 className="text-center">{this.props.searchTerm}</h1>);
    }

    return (
      <div className="HomePage">
        <SearchHeader appName="BarSVP" search={this.handelSearch} />
        {searchTerm}
        {cardGrid}
        {this.props.isFetching ? <Loading /> : null}
      </div>
    );
  }
}

// export default connect(mapStateToProps)(HomePage);
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
