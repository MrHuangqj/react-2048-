import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "lib-flexible"
import Header from './components/Header';
import Content from './components/Content';

class Game extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      score: 0,
    };
  }
  setScore = (score) => {
    console.log('分数：', score);
    this.setState({
      score: score,
    });
  }
  render () {
    return (
      <div className="game">
        <Header score={this.state.score} />
        <Content setScore={this.setScore} />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
