import React from 'react';

import './endGame.css';

export default (props) => {

  const endGameText = {
      won:  'CONGRATULATIONS YOU HAVE VANQUISHED THE SKELETON KING!!!',
      lost: 'YOU HAVE BEEN SLAIN!!!',
      playing: 'YOU SHOULD BR FIGHTING FOR YOUR LIFE WHY ARE YOU SEEING THIS!!'
  }

  return (
    <div className="endGame">
      <h3 className="endText">{endGameText[props.gameState]}</h3>
    </div>

  );

}
