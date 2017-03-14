const combat = (function() {
  //  attack(destination, attacker, defender, dungeonMap)
  // function attack(x, y, enemy, player, dungeonMap) {
  //   console.log(player.health, enemy.health);
  //   let newDungeonMap = dungeonMap;
  //   // calculate players damage
  //   const playerDamage = _calculateDamage(player.attack + player.weapon.attack);
  //   // calculate enemy damage
  //   const enemyDamage = _calculateDamage(enemy.attack);
  //
  //   // make attack
  //   player.health -= enemyDamage;
  //   enemy.health -= playerDamage;
  //   if (player.health <= 0) { // if player is killed
  //     alert("GAME OVER!!!");
  //   } else if (enemy.health <= 0) { // if enemy is killed
  //     newDungeonMap.tile = 1;
  //     console.log("old health", player.health);
  //     player = _addExerience(player, newDungeonMap[x][y].enemy.attack);
  //     newDungeonMap[x][y].enemy = false;
  //   }
  //
  //   return {dungeonMap: newDungeonMap, player: player}
  // }

  function attack(att, def) {
    const damage =(att.weapon)?  _calculateDamage(att.attack + att.weapon.attack): _calculateDamage(att.attack);
    console.log(def);
    def.health -= damage;
    return (_defKilled(def))? null: def;

  }

  function _defKilled(def) {
    if (def.health <= 0) return true;
  }

  function _addExerience(player, exp) {
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

  function _calculateDamage(attack) {
    return Math.round(Math.random() * ((attack + 3) - attack) + attack);
  }
  return ({
    attack
  })
})();

export default combat;
