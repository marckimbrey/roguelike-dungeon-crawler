import React, { Component } from 'react';

import './App.css';
import dungeon from '../dungeon';
import Canvas from '../Canvas/Canvas';
import Combat from '../combat';
import Movement from '../movement';

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
    const moveDirection = Movement.getDirection(event.keyCode);

    if(moveDirection) {
      const destination = newDungeonState[x + moveDirection.x][y + moveDirection.y];
      const newCoords = { x: x + moveDirection.x, y: y + moveDirection.y };
      if(destination.enemy) {
        this.setState(Object.assign(
          {},
          this.state,
          Combat.attack(newCoords.x, newCoords.y, destination.enemy, this.state.player, this.state.dungeonMap)
        ));
      } else if(destination.tile !== 2) {
        newDungeonState[x][y].tile =1
        newDungeonState[newCoords.x][newCoords.y].tile ='player'
        const newPlayerState = Object.assign(
          {},
          this.state.player,
          {location: {
            x: newCoords.x,
            y: newCoords.y
          }
        });
        this.setState({
          dungeonMap: newDungeonState,
          player: newPlayerState
        });
      }
    }

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
