import React, { Component } from 'react';

import './App.css';
import dungeon from '../dungeon';
import Canvas from '../Canvas/Canvas';
import PlayerStats from '../PlayerStats/PlayerStats';
import Combat from '../combat';
import Movement from '../movement';
import player from '../player';

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
  }
  componentDidMount() {
    window.addEventListener("keydown", this.onArrowKeyPress);
  }

  onArrowKeyPress(event) {
    const newState = Object.assign(this.state, player.makeMove(event.keyCode,  this.state.player, this.state.dungeonMap));
    this.setState(newState);
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
