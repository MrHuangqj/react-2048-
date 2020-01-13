import React from 'react';
import style from './index.scss';

class Header extends React.Component {
  render () {
    return (
      <div className={style.header}>
        <div className={style.headerItem}>
          <h1 className={style.name}>2048</h1>
          <div className={style.main}>
            <div className={style.score}>
              <h2 className={style.scoreH2}>SCORE</h2>
              <p className={style.scoreP}>{this.props.score}</p>
            </div>
            <div className={style.best}>
              <h2 className={style.scoreH2}>BEST</h2>
              <p className={style.scoreP}>0</p>
            </div>
          </div>
        </div>
        <div className={style.tip}>
          <p className={style.tipMessage}>
            Join the numbers and get to the <span className={style.span}>2048 title!</span>
          </p>
          <div className={style.gameStart}>
            New Game
          </div>
        </div>
      </div>
    );
  }
}

export default Header

