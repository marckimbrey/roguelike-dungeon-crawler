import combat from './combat';

const player = (function() {

  function newPlayer() {
    this.level = 1;
    this.experience = 0;
    this.health = 60;
    this.attack = 5;
    this.facing = 'down';
    this.weapon = {
      name: 'hands',
      attack: 5
    }
  }

  function playerLocation(dungeonMap) {
    dungeonMap.forEach((row, x) => {
      row.forEach((sqr, y) => {
        if(sqr.tile === 'player'){
          return  {x: x, y: y};
        }
       });
     });
  }

  function makeMove(keyCode, player, dungeonMap) {
    const direction = _getDirection(keyCode);
    const x = player.location.x;
    const y = player.location.y;
    let newDungeonState = dungeonMap;
    let newPlayerState = player;
    if(direction) {
      const destination = newDungeonState[x + direction.x][y + direction.y];
      const newCoords = { x: x + direction.x, y: y + direction.y };
      // get direction player is facing
      newPlayerState.facing =  _getfacing(player.facing, direction);
      if(destination.enemy) {
        // attack enemy
        const newEnemy = combat.attack(player, destination.enemy);
        // calculate experience
        _addExperience(newPlayerState, destination.enemy.attack);
        if (newEnemy.health <= 0) { // if enemy has been killed
          newDungeonState[x + direction.x][y + direction.y].enemy = null
        } else { // set enemy new health
          newDungeonState[x + direction.x][y + direction.y].enemy = newEnemy;
        }

      } else if(destination.tile !== 2) {
        if(destination.tile === 'item' || destination.tile === 'health') {
          newPlayerState = _pickUpItem(player, destination.tile);
        }
        newDungeonState[x][y].tile =1
        newDungeonState[newCoords.x][newCoords.y].tile ='player';
         newPlayerState = Object.assign(
          {},
          player,
          newPlayerState,
          {location: {
            x: newCoords.x,
            y: newCoords.y
          }
        });
      }

    }

    return {
      dungeonMap: newDungeonState,
      player: newPlayerState
    };
  }

  function _getDirection(keyCode) {
    let direction;

    switch(keyCode) {
        case 38: // up
          direction = {x: 0 , y: -1};
          break;
        case 39: // right
          direction = {x: 1 , y: 0};
          break;
        case 40: // down
          direction = {x: 0 , y: 1};
          break;
        case 37: // left
          direction = {x: -1 , y: 0};
          break;
        default:
          direction = null;
          break;
    }
    return direction
  }

  function _getfacing(curDir, dest) {
    let nextDir
    if (dest.x === 1) { // right
      nextDir = (curDir === 'right')? 'right2': 'right';
    } else if (dest.x === -1) { // left
      nextDir = (curDir === 'left')? 'left2': 'left';
    } else if (dest.y === -1) { // up
      nextDir = (curDir === 'up')? 'up2': 'up';
    } else if (dest.y === 1) { // down
      nextDir = (curDir === 'down')? 'down2': 'down';
    }

    return nextDir;
  }

  function _pickUpItem(player, itemType) {
    const weapons = [
      {name: 'hands', attack: 5},
      {name: 'stick', attack: 8},
      {name: 'knife', attack: 10},
      {name: 'shortsword', attack: 12},
      {name: 'longsword', attack: 16},
      {name: 'battleaxe', attack: 20}
    ];
    let currItemIndex;
    if (itemType === 'health') {
      player.health += 20
    } else if (itemType === 'item') {
      weapons.forEach((e,i)=> {
        if(e.name === player.weapon.name) {
          currItemIndex = i;
        }
      });
      if (currItemIndex < weapons.length - 1) {
        player.weapon = weapons[currItemIndex +1];
      }
    }

    return player;
  }

  function _addExperience(player, exp) {
    player.experience += exp;
    if (player.level < Math.floor(player.experience / 15) +1) _addLevel(player);
    return player
  }

  function _addLevel(player) {
    player.level++;
    player.attack += Math.round(Math.random() * 2);
    player.health += Math.round(Math.random() * (player.health * 0.25))
    return player;
  }


  return ({
    newPlayer,
    playerLocation,
    makeMove
  });
})();

export default player;
