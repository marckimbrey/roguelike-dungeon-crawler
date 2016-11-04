import React, { Component } from 'react';

import './App.css';
import generateDungeon from '../dungeon';
import Canvas from '../Canvas/Canvas';

class App extends Component {
  constructor(props) {
    super(props);
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
    this.onArrowKeyPress = this.onArrowKeyPress.bind(this);
  }
  componentDidMount() {
    window.addEventListener("keydown", this.onArrowKeyPress);
  }

  onArrowKeyPress(event) {
    const x = this.state.player.location.x;
    const y = this.state.player.location.y;
    let newDungeonState = this.state.dungeonMap;
    switch(event.keyCode) {
      case 38: // up
        if(newDungeonState[x][y-1].tile !== 2) {
          newDungeonState[x][y].tile =1
          newDungeonState[x][y-1].tile ='player'
          this.setState({
            dungeonMap: newDungeonState,
            player:{
              location: {
                x: x,
                y: y-1
              }}
          });
        };
        break;
      case 39: // right
        if (newDungeonState[x+1][y].tile !== 2) {
          newDungeonState[x][y].tile =1
          newDungeonState[x+1][y].tile ='player'
          this.setState({
            dungeonMap: newDungeonState,
            player:{
              location: {
                x: x+1,
                y: y
              }}
          });
        }
        break;
      case 40: // down
        if (newDungeonState[x][y+1].tile !== 2) {
          newDungeonState[x][y].tile =1
          newDungeonState[x][y+1].tile ='player'
          this.setState({
            dungeonMap: newDungeonState,
            player:{
              location: {
                x: x,
                y: y+1
              }}
          });
        };
        break;
      case 37: // left
        if (newDungeonState[x-1][y].tile !== 2) {
          newDungeonState[x][y].tile =1
          newDungeonState[x-1][y].tile ='player'
          this.setState({
            dungeonMap: newDungeonState,
            player:{
              location: {
                x: x-1,
                y: y
              }}
          });
        };
        break;
      default:
        console.log(`key does not match: ${event.keyCode}`);
        break;
    }
  }
  render() {
    return (
      <div className="App"


      >
        <Canvas
          dungeonMap={this.state.dungeonMap}
          playerLocation={this.state.player.location}

        />
      </div>
    );
  }
}
export default App;
