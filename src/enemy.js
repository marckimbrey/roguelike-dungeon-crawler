let enemy = function() {
  this.health = 0;
  this.attack = 0;
  this.location ={};
  this.createEnemy = (newEnemy) => {
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

            this.location = {x: newEnemy.x, y: newEnemy.y}

  }
}


export default enemy;
