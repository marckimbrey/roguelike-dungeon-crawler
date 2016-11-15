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
    });
    this.state  = {
      dungeonMap: dungeonMap,
      player: {
        level: 1,
        experience: 0,
        health: 60,
        attack: 5,
        location: playerLocation,
        weapon: {
          name: 'hands',
          strength: 5
        }
      },
      boss: {
        health: 80,
        attack: 12,
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
        if(newDungeonState[x][y-1].enemy) {
          this.combat(x, y,newDungeonState[x][y-1], this.state.player );
        } else if(newDungeonState[x][y-1].tile !== 2) {
          newDungeonState[x][y].tile =1
          newDungeonState[x][y-1].tile ='player'
          const newPlayerState = Object.assign(
            {},
            this.state.player,
            {location: {
              x: x,
              y: y-1
            }
          });
          this.setState({
            dungeonMap: newDungeonState,
            player: newPlayerState
          });
        };
        break;
      case 39: // right
        if (newDungeonState[x+1][y].enemy) {
          this.combat(x, y, newDungeonState[x+1][y], this.state.player);
        } else if (newDungeonState[x+1][y].tile !== 2) {
          newDungeonState[x][y].tile =1
          newDungeonState[x+1][y].tile ='player';
          const newPlayerState = Object.assign(
            {},
            this.state.player,
            {location: {
              x: x+1,
              y: y
            }
          });
          this.setState({
            dungeonMap: newDungeonState,
            player: newPlayerState
          });
        }
        break;
      case 40: // down
        if(newDungeonState[x][y+1].enemy) {
          this.combat(x, y,newDungeonState[x][y+1], this.state.player);
        } else if (newDungeonState[x][y+1].tile !== 2) {
          newDungeonState[x][y].tile =1
          newDungeonState[x][y+1].tile ='player';
          const newPlayerState = Object.assign(
            {},
            this.state.player,
            {location: {
              x: x,
              y: y+1
            }
          });
          this.setState({
            dungeonMap: newDungeonState,
            player: newPlayerState
          });
        };
        break;
      case 37: // left
        if (newDungeonState[x-1][y].enemy) {
          this.combat(x,y, newDungeonState[x-1][y], this.state.player);
        } else if (newDungeonState[x-1][y].tile !== 2) {
          newDungeonState[x][y].tile =1
          newDungeonState[x-1][y].tile ='player';
          const newPlayerState = Object.assign(
            {},
            this.state.player,
            {location: {
              x: x-1,
              y: y
            }
          });
          this.setState({
            dungeonMap: newDungeonState,
            player: newPlayerState
          });
        };
        break;
      default:
        console.log(`key does not match: ${event.keyCode}`);
        break;
    }
  }
  combat(xPos, yPos, enemy, player) {
    console.log(xPos, yPos, enemy, player);
  }
  calculateDamage(attack, weaponStrength = 0) {
    return (attack + weaponStrength);
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
