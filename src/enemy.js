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
    if (_nearPlayer(enemy.location, player.location)) {
      console.log('near player', enemy.location, player.location)
    }

    // move towards player or attack

    // return newState;


  }

  function _move() {

  }


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
