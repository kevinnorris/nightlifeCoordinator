// npm packages
import React from 'react';
import {connect} from 'react-redux';

import Card from '../../components/Card';
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
        description: bar.rating,
        selected: false,
        numGoing: 0,
      }));
    }

    return (
      <div className="HomePage">
        <h1>Home</h1>
        {this.props.bars ? <CardGrid CardInfo={cardFormatedData} /> : <p>Loading</p>}
      </div>
    );
  }
}

// HomePage.propTypes = {
//   name: React.PropTypes.string.isRequired,
// };

const mapStateToProps = state => ({
  bars: state.yelpData.bars,
});

const mapDispatchToProps = dispatch => ({
  getYelpData: () => dispatch(getYelpData()),
});

// export default connect(mapStateToProps)(HomePage);
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
