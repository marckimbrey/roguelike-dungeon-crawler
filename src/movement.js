const movement = (function() {
  function makeMove(playerLocation, dungeonMap) {

  }

  function getDirection(keyCode) {
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

  function pickUpItem(player, itemType) {
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

  return (
    {
      getDirection,
      pickUpItem
    }
  )
})()

export default movement;
