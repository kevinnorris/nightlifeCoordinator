// npm packages
import React from 'react';

// style
import './loading.scss';

class Loading extends React.Component {
  state = {
    activeDot: 1,
    length: 5,
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.activeDot < 5) {
        this.setState({
          ...this.state,
          activeDot: this.state.activeDot += 1,
        });
      } else {
        this.setState({
          ...this.state,
          activeDot: 1,
        });
      }
    }, 400);
  }

  render() {
    return (
      <h1 className="Loading text-center">
        <span className={this.state.activeDot === 1 && 'Loading-active'}>.</span>
        <span className={this.state.activeDot === 2 && 'Loading-active'}>.</span>
        <span className={this.state.activeDot === 3 && 'Loading-active'}>.</span>
        <span className={this.state.activeDot === 4 && 'Loading-active'}>.</span>
        <span className={this.state.activeDot === 5 && 'Loading-active'}>.</span>
      </h1>
    );
  }
}

export default Loading;
