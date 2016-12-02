const combat = (function() {
  function attack(x, y, enemy, player, dungeonMap) {
    console.log(player, player.health, enemy.health);
    let newDungeonMap = dungeonMap;
    // calculate players damage
    const playerDamage = calculateDamage(player.attack + player.weapon.attack);
    // calculate enemy damage
    const enemyDamage = calculateDamage(enemy.attack);

    // make attack
    player.health -= enemyDamage;
    enemy.health -= playerDamage;
    if (player.health <= 0) { // if player is killed
      alert("GAME OVER!!!");
    } else if (enemy.health <= 0) { // if enemy is killed
      newDungeonMap.tile = 1;
      newDungeonMap[x][y].enemy = false;
    }

    return {dungeonMap: newDungeonMap, player: player}
  }

  function calculateDamage(attack) {
    return Math.round(Math.random() * ((attack + 3) - attack) + attack);
  }
  return ({
    attack: attack
  })
})();

export default combat;
