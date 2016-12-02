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
          direction = undefined;
          break;
    }
    return direction
  }

  return (
    {getDirection}
  )
})()

export default movement;
