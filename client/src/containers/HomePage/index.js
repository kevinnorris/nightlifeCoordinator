// npm packages
import React from 'react';
import {connect} from 'react-redux';

import CardGrid from './CardGrid';
import {getYelpData, toggleGoing} from './duck';
import SearchHeader from './SearchHeader';
import Loading from '../../components/Loading';

// style
import './home.scss';

const mapStateToProps = state => ({
  bars: state.yelpData.bars,
  isFetching: state.yelpData.isFetching,
  searchTerm: state.yelpData.searchTerm,
  userId: state.auth.user,
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  getYelpData: payload => dispatch(getYelpData(payload)),
  toggleGoing: payload => dispatch(toggleGoing(payload)),
});

class HomePage extends React.Component {
  static defaultProps = {
    bars: null,
    token: null,
  }
  static propTypes = {
    bars: React.PropTypes.arrayOf(React.PropTypes.object),
    isFetching: React.PropTypes.bool.isRequired,
    searchTerm: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
    token: React.PropTypes.string,
    getYelpData: React.PropTypes.func.isRequired,
    toggleGoing: React.PropTypes.func.isRequired,
  }

  handelSearch = (searchTerm) => {
    if (this.props.userId) {
      this.props.getYelpData({searchTerm, userId: this.props.userId});
    } else {
      this.props.getYelpData({searchTerm});
    }
  }

  handelGoing = (isGoing, name) => (
    () => {
      if (!isGoing) {
        // Sets expire date to tomorrow at 3am local time
        const d = new Date();
        d.setHours(3);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setDate(d.getDate() + 1);
        const expireDate = d.getTime();

        this.props.toggleGoing({
          going: true,
          businessName: name,
          userId: this.props.userId,
          expireDate,
          token: this.props.token,
        });
      } else {
        this.props.toggleGoing({
          going: false,
          businessName: name,
          userId: this.props.userId,
          token: this.props.token,
        });
      }
    }
  );

  render() {
    let cardFormatedData = null;
    if (this.props.bars) {
      cardFormatedData = this.props.bars.map(bar => ({
        title: bar.name,
        url: bar.url,
        imgUrl: bar.imgUrl,
        alt: bar.name,
        rating: bar.rating,
        numGoing: bar.numGoing,
        userGoing: bar.userGoing,
      }));
    }

    let cardGrid = null;
    if (!this.props.isFetching && cardFormatedData) {
      if (this.props.userId) {
        cardGrid = (<CardGrid CardInfo={cardFormatedData} goingClicked={this.handelGoing} />);
      } else {
        cardGrid = (<CardGrid CardInfo={cardFormatedData} />);
      }
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
