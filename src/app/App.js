import React, { Component } from 'react';

import './App.css';
import dungeon from '../dungeon';
import Canvas from '../Canvas/Canvas';
import Combat from '../combat';

class App extends Component {
  constructor(props) {
    super(props);

    dungeon.generate();
    const dungeonMap = dungeon.dungeonMap;

    this.state  = {
      dungeonMap: dungeonMap,
      player: {
        level: 1,
        experience: 0,
        health: 60,
        attack: 5,
        location: dungeon.playerLocation(),
        weapon: {
          name: 'hands',
          attack: 5
        }
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
          Combat.attack(x, y-1, newDungeonState[x][y-1].enemy, this.state.player, this.state.dungeonMap );
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
          Combat.attack(x+1, y, newDungeonState[x+1][y].enemy, this.state.player, this.state.dungeonMap);
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
          Combat.attack(x, y+1, newDungeonState[x][y+1].enemy, this.state.player, this.state.dungeonMap);
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
            player: newPlayerState,
          });
        };
        break;
      case 37: // left
        if (newDungeonState[x-1][y].enemy) {
          Combat.attack(x-1, y, newDungeonState[x-1][y].enemy, this.state.player, this.state.dungeonMap);
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

  addExperience() {

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
      </div>
    );
  }
}
export default App;
