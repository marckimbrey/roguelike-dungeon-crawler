import React, { Component } from 'react';

import './App.css';
import generateDungeon from '../dungeon';
import Canvas from '../Canvas/Canvas';

class App extends Component {
  constructor() {
    super();
    const dungeonMap = generateDungeon();
    let playerLocation;
     dungeonMap.forEach((row, x) => {
      row.forEach((sqr, y) => {
        if(sqr.tile === 'player'){
          playerLocation = {x: x, y: y};
        }
      });
    })
    this.state  = {
      dungeonMap: dungeonMap,
      player: {
        level: 1,
        health: 100,
        attack: 5,
        location: playerLocation
      }
    }
  }
  render() {
    return (
      <div className="App">
        <Canvas
          dungeonMap={this.state.dungeonMap}
          playerLocation={this.state.player.location}
        />
      </div>
    );
  }
}

export default App;
