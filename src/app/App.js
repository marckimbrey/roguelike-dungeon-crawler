import React, { Component } from 'react';

import './App.css';
import dungeon from '../dungeon';
import Canvas from '../Canvas/Canvas';
import PlayerStats from '../PlayerStats/PlayerStats';
import MobileControls from '../MobileControls/MobileControls';
import EndGame from '../EndGame/EndGame';
import player from '../player';
import enemy from '../enemy';

class App extends Component {
  constructor(props) {
    super(props);

    dungeon.generate();
    const dungeonMap = dungeon.dungeonMap;
    const newPlayer = Object.assign(new player.newPlayer,{location: dungeon.playerLocation(dungeonMap)});



    this.state  = {
      dungeonMap: dungeonMap,
      player: newPlayer,
      enemies: dungeon.enemies,
      gameState: 'playing'
    }
    this.onArrowKeyPress = this.onArrowKeyPress.bind(this);
    this.enemiesTurn = this.enemiesTurn.bind(this);
    this.checkTime = 0;
  }
  componentDidMount() {
    window.addEventListener("keydown", this.onArrowKeyPress);
    setInterval(this.enemiesTurn, 200);
  }

  componentWillUpdate() {

     this.endGame();
  }


  onArrowKeyPress(event) {
    let keycode = (event.keyCode)? event.keyCode : event;
    // checktime and currentTime used to prvent player from moving too quickly
    var currentTime = new Date()
    if((currentTime.getTime() -this.checkTime) > 100 && this.state.gameState === 'playing'){
      const newState = Object.assign(this.state, player.makeMove(keycode,  this.state.player, this.state.dungeonMap));

      this.checkTime =currentTime.getTime();
      this.setState(newState);


    }



  }

  enemiesTurn() {

    this.state.dungeonMap.filter((row, x) => {
      row.filter((sqr, y) => {
        if(sqr.enemy && this.state.player.health > 0) {
          const enemyTurn = enemy.takeTurn(this.state.dungeonMap, this.state.player, sqr.enemy);
          const newState = Object.assign({}, this.state, enemyTurn );

          if (enemyTurn) {
            this.setState(newState);
          }
        }
      })
    })
  }

  endGame() {


    if (this.state.gameState !== 'playing') { // if game is over
      document.getElementsByClassName('endGame')[0].classList.add('gameOver');
    }
    let newGameState;
    // gameState = 'win' is returned when player kills boss when attacking
    if (this.state.player.health <= 0 && this.state.gameState !== 'lost') {
      newGameState = 'lost';

      this.setState({gameState: newGameState})
    }
  }

  render() {
    return (
      <div className="App">
        <EndGame gameState={this.state.gameState} />
        <Canvas
          dungeonMap={this.state.dungeonMap}
          playerLocation={this.state.player.location}
          playerDirection={this.state.player.facing}

        />
        <PlayerStats player={this.state.player}/>
        <MobileControls btnPressed={this.onArrowKeyPress} />
      </div>
    );
  }
}
export default App;
