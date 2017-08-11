import combat from './combat';

let enemy = {
  health: 0,
  attack: 0,
  facing: 'south',
  type: null,
  location: {x: 0, y: 0},

  createEnemy: function(newEnemy)  {
            if (newEnemy.type === 'enemy1') {
              this.health = 20;
              this.attack = 6;
            } else if (newEnemy.type === 'enemy2') {
              this.health = 40;
              this.attack = 8;
            } else if (newEnemy.type === 'boss') {
              this.health = 80;
              this.attack = 12;
            }
            this.type = newEnemy.type;
            this.facing = 'south';
            this.location = {x: newEnemy.x, y: newEnemy.y}

  },
  takeTurn: function(dungeonMap, player, enemy) {
    // if !_nearPlayer return
    if (!this._nearPlayer(enemy.location, player.location)) return null;
    // move towards player or attack
    const newState = this._move(dungeonMap, player,enemy)
    // return newState;
    return newState;

  },
  _move: function(dungeonMap, player,enemy) {
    if (this._canAttack(player.location,enemy.location)) {
      const newPlayerState = combat.attack(enemy, player);
      return {dungeonMap: dungeonMap, player: newPlayerState}
    }
    // get possible moves

    const newMove = this._possibleMoves(dungeonMap, player.location, enemy.location);
    let newDungeonMap = dungeonMap;
    // make move

    if(newMove) {
      newDungeonMap[enemy.location.x][enemy.location.y].enemy = false;
      //console.log(newDungeonMap[enemy.location.x][enemy.location.y].enemy)
      newDungeonMap[enemy.location.x][enemy.location.y].tile = 1;


      newDungeonMap[newMove.x][newMove.y].enemy = enemy;
      newDungeonMap[newMove.x][newMove.y].enemy.location = newMove;
      newDungeonMap[newMove.x][newMove.y].tile = enemy.type;

      //console.log('new tile', newDungeonMap[newMove.x][newMove.y].tile)
    }
    return {dungeonMap: newDungeonMap, player: player};


  },


  _possibleMoves: function(dungeonMap, player, enemy) {
    let possibleMoves;
    let enemyX = enemy.x;
    let enemyY = enemy.y;
    if (enemyX !== player.x) {
      if(player.x > enemyX) enemyX++;
      else enemyX--;
    } else if (enemyY.y !== player.y) {

      if(enemyY > player.y) enemyY--;
      else enemyY++;

    }
          if(dungeonMap[enemyX][enemyY].tile === 1) possibleMoves = {x:enemyX, y:enemyY};

    return possibleMoves;

  },

  _canAttack: function(player, enemy) {
    if ((player.x - enemy.x === 0) && (player.y - enemy.y === -1 || player.y - enemy.y === 1)) {
      return true;
    } else if ((player.y - enemy.y === 0) && (player.x - enemy.x === -1 || player.x - enemy.x === 1)) {
      return true;
    }

    return false;
  },


  _nearPlayer: function(curLocation, playerLocation) {
    let nearPlayer = false;
    // check x + or - 7
    if (curLocation.x - playerLocation.x >= -7 && curLocation.x - playerLocation.x <=7 ) {
          // check y + or - 7
      if (curLocation.y - playerLocation.y >= -7 && curLocation.y - playerLocation.y <=7 ) {
        nearPlayer = true;
      }
    }
    // console.log('near player: ' + nearPlayer)
    return nearPlayer;




    // move

  }

  };


export default enemy;
