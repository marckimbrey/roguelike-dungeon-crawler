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
    const newPlayer = Object.assign(new player.newPlayer,{location: dungeon.playerLocation(dungeonMap)})


    this.state  = {
      dungeonMap: dungeonMap,
      player:newPlayer,
      enemies: dungeon.enemies
    }
    this.onArrowKeyPress = this.onArrowKeyPress.bind(this);
    this.enemiesTurn = this.enemiesTurn.bind(this);
  }
  componentDidMount() {
    window.addEventListener("keydown", this.onArrowKeyPress);
    setInterval(this.enemiesTurn, 5000);
  }

  onArrowKeyPress(event) {
    const newState = Object.assign(this.state, player.makeMove(event.keyCode,  this.state.player, this.state.dungeonMap));
    this.setState(newState);
  }

  enemiesTurn() {
    this.state.dungeonMap.filter((row) => {
      row.filter((row) => {
        if(row.enemy) {
          enemy.takeTurn(this.state.dungeonMap, this.state.player, row.enemy)
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

        />
        <div>
          <PlayerStats player={this.state.player}/>
        </div>
      </div>
    );
  }
}
export default App;
