import React, { Component } from 'react';

import './App.css';
import dungeon from '../dungeon';
import Canvas from '../Canvas/Canvas';

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
          this.combat(x, y-1, newDungeonState[x][y-1].enemy, this.state.player );
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
          this.combat(x+1, y, newDungeonState[x+1][y].enemy, this.state.player);
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
          this.combat(x, y+1, newDungeonState[x][y+1].enemy, this.state.player);
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
          this.combat(x-1, y, newDungeonState[x-1][y].enemy, this.state.player);
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
  combat(x, y, enemy, player) {
    console.log(player, player.health, enemy.health);
    let newDungeonMap = this.state.dungeonMap;
    let newPlayer;
    // calculate players damage
    const playerDamage = this.calculateDamage(player.attack + player.weapon.attack);
    // calculate enemy damage
    const enemyDamage = this.calculateDamage(enemy.attack);
    // make attack
    player.health -= enemyDamage;
    enemy.health -= playerDamage;
    if (player.health <= 0) { // if player is killed
      this.gameOver();
    } else if (enemy.health <= 0) { // if enemy is killed
      newDungeonMap.tile = 1;
      newDungeonMap[x][y].enemy = false;
      this.setState(Object.assign({}, this.state.dungeonMap, newDungeonMap));
    } else { // calculate new health
      newDungeonMap[x][y].enemy = enemy;
      newPlayer = Object.assign({}, this.state.player, player);

      this.setState(Object.assign(
        {},
        this.state,
        {dungeonMap: newDungeonMap, player: newPlayer}
      ));
    }
  }
  calculateDamage(attack) {
    return Math.round(Math.random() * ((attack + 3) - attack) + attack);
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
