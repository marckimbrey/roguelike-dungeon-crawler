let enemy = (function() {

  function createEnemy (newEnemy)  {
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
            this.directionFacing = 'south';
            this.location = {x: newEnemy.x, y: newEnemy.y}

  }

  function takeTurn(dungeonMap, player,enemy) {

    // if !_nearPlayer return
    if (!_nearPlayer(enemy.location, player.location)) return;

    // move towards player or attack
    return _move(dungeonMap, player,enemy)
    // return newState;


  }

  function _move(dungeonMap, player,enemy) {
    if (_canAttack(player.location,enemy.location)) {
      console.log('can attack');
    }
    // get possible moves
    const newMove =_possibleMoves(dungeonMap, player.location, enemy.location)
    // make move
    console.log(newMove)
    if(newMove) {
      //console.log(dungeonMap[enemy.location.x][enemy.location.y])
      dungeonMap[enemy.location.x][enemy.location.y].enemy = false;
      dungeonMap[newMove.x][newMove.y].enemy = enemy;
      dungeonMap[newMove.x][newMove.y].enemy.location = newMove;
    }
    return {dungeonMap: dungeonMap, player: player};


  }

  function _possibleMoves(dungeonMap, player, enemy) {
    let possibleMoves;
    let enemyX = enemy;
    let enemyY = enemy;
    if (enemyX.x !== player.x) {
      if(player.x > enemyX.x) enemyX.x++;
      else enemyX.x--;
      if(dungeonMap[enemyX.x][enemyX.y].tile === 1) possibleMoves =enemyX
    } else if (enemyY.y !== player.y) {

      if(enemyY.y > player.y) enemyY.y--;
      else enemyY.y++;
      if(dungeonMap[enemyY.x][enemyY.y].tile === 1) possibleMoves = enemyY;
    }

    return possibleMoves;

  }

  function _canAttack(player, enemy) {
    if ((player.x - enemy.x === 0) && (player.y - enemy.y === -1 || player.y - enemy.y === 1)) {
      return true;
    } else if ((player.y - enemy.y === 0) && (player.x - enemy.x === -1 || player.x - enemy.x === 1)) {
      return true;
    }

    return false;
  };


  function _nearPlayer(curLocation, playerLocation) {
    let nearPlayer = false;
    // check x + or - 7
    if (curLocation.x - playerLocation.x >= -7 && curLocation.x - playerLocation.x <=7 ) {
          // check y + or - 7
      if (curLocation.y - playerLocation.y >= -7 && curLocation.y - playerLocation.y <=7 ) {
        nearPlayer = true;
      }
    }

    return nearPlayer;




    // move

  }

  return ({
    createEnemy,
    takeTurn
  });
})()


export default enemy;
