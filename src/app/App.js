import React, { Component } from 'react';

import './App.css';
import dungeon from '../dungeon';
import Canvas from '../Canvas/Canvas';
import PlayerStats from '../PlayerStats/PlayerStats';
import Combat from '../combat';
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
      enemies: dungeon.enemies
    }
    this.onArrowKeyPress = this.onArrowKeyPress.bind(this);
    this.enemiesTurn = this.enemiesTurn.bind(this);
    this.checkTime = 0;
  }
  componentDidMount() {
    window.addEventListener("keydown", this.onArrowKeyPress);
    setInterval(this.enemiesTurn, 1000);
  }

  componentDidUpdate() {
    if (this.state.player.health <= 0) {
      clearInterval(this.enemiesTurn);
      console.log('You have died, game over!!!');
    }
  }


  onArrowKeyPress(event) {

    var currentTime = new Date()
    if((currentTime.getTime() -this.checkTime) > 150){
      const newState = Object.assign(this.state, player.makeMove(event.keyCode,  this.state.player, this.state.dungeonMap));

      this.checkTime =currentTime.getTime();
      this.setState(newState);


    }



  }

  enemiesTurn() {

    this.state.dungeonMap.filter((row, x) => {
      row.filter((sqr, y) => {
        if(sqr.enemy && this.state.player.health > 0) {
          //console.log(sqr.enemy)
          const enemyTurn = enemy.takeTurn(this.state.dungeonMap, this.state.player, sqr.enemy);
          //console.log(this.state.dungeonMap[sqr.enemy.location.x][sqr.enemy.location.y]);
          const newState = Object.assign({}, this.state, enemyTurn );

          if (enemyTurn) {
            this.setState(newState);
          }
        }
      })
    })
  }

  gameOver() {
    alert('GAME OVER!!!');
  }
  render() {
    return (
      <div className="App">
        <Canvas
          dungeonMap={this.state.dungeonMap}
          playerLocation={this.state.player.location}
          playerDirection={this.state.player.facing}

        />
        <PlayerStats player={this.state.player}/>
      </div>
    );
  }
}
export default App;
