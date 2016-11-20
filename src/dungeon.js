let dungeon = (function(){

  let dungeonMap = [];
  const mapSize = 60;
  let rooms = [];

  const roomCount = getRandom(11,20);
  const minSize = 5;
  const maxSize = 15;

  function generate() {
    // create 2 dimentional array
    for(let x=0; x<mapSize; x++) {
      dungeonMap[x] = [];
      for(let y=0; y<mapSize; y++) {
          dungeonMap[x][y] = {
            tile: 0,
            explored: false,
            enemy: false
          };
      }
    };
    // add random sized rooms
    for(let i=0; i<roomCount; i++) {
      const room = generateRoom();
      // if colllides with a room repeat loop
      if(DoesCollide(room, rooms, i)) {
        i--;
        continue;
      }
      // to make sure rooms are not directly next ro each other
      room.w--;
      room.h--;

      rooms.push(room);
    };
    // connect two random  rooms
    for(let i=0; i<roomCount -1; i++) {
      connectRooms(rooms[i], rooms[i+1]);
    };

    // set insides of rooms = 1
    rooms.forEach((room) => {
      for(let x=room.x; x<room.x +room.w; x++) {
        for(let y=room.y; y<room.y +room.h; y++) {
          dungeonMap[x][y].tile = 1
        }
      }
    });

    addWalls();

    let player = false, isABoss = false;
    const enemy1 = {
      health: 20,
      attack: 6
    };
    const enemy2 = {
      health: 40,
      attack: 8
    };
    const boss = {
      health: 80,
      attack: 12
    }
    rooms.forEach((room) => {
      let newVal;
      if (!player) {
        player = true;
        newVal = fillRoom(room, 'player');
      } else if (!isABoss) {
        isABoss = true;
        newVal = fillRoom(room, 'boss');
      } else {
        newVal = fillRoom(room);
      }
      switch (newVal[1]) {
        case 'boss':
          dungeonMap[newVal[0].x][newVal[0].y].enemy = boss;
          break;
        case 'enemy1':
          dungeonMap[newVal[0].x][newVal[0].y].enemy = Object.create(enemy1);
          break;
        case 'enemy2':
          dungeonMap[newVal[0].x][newVal[0].y].enemy =  Object.create(enemy2);
          break;
        default:
        break;
      }
      dungeonMap[newVal[0].x][newVal[0].y].tile = newVal[1];
    });
    return dungeonMap;
  }

  function generateRoom() {
    const room = {};
    room.x = getRandom(1, mapSize - maxSize - 1);
    room.y = getRandom(1, mapSize - maxSize - 1);
    room.w = getRandom(minSize, maxSize);
    room.h = getRandom(minSize, maxSize);
    return room;
  }

  function DoesCollide(room, rooms, ignore) {
    for(let i=0; i<rooms.length; i++) {
      if (i === ignore) continue;
      let check = rooms[i];
      if (!((room.x + room.w < check.x) || (room.x > check.x + check.w) ||
      (room.y + room.h < check.y) || (room.y > check.y + check.h))) return true;
    }
    return false
  }

  function connectRooms(room1, room2) {
    const roomA = room1;
    const roomB = room2;

    let pointA = {
      x: getRandom(roomA.x, roomA.x + roomA.w),
      y: getRandom(roomA.y,  roomA.y + roomA.h)
    };
    let pointB = {
      x: getRandom(roomB.x, roomB.x + roomB.w),
      y: getRandom(roomB.y,  roomB.y + roomB.h)
    };

    while (pointB.x !== pointA.x || pointB.y !== pointA.y) {
      if (pointA.x !== pointB.x) {
        if(pointB.x > pointA.x) pointB.x--;
        else pointB.x++;
      } else if (pointB.y !== pointA.y) {
        if(pointB.y > pointA.y) pointB.y--;
        else pointB.y++;
      }

      dungeonMap[pointB.x][pointB.y].tile = 1;
    }
  }

  function addWalls() {
    for(let x=0; x<mapSize; x++) {
      for(let  y=0; y<mapSize; y++) {
        if (dungeonMap[x][y].tile === 1) {
          for (let xx = x - 1; xx <= x + 1; xx++) {
            for (let yy = y - 1; yy <= y + 1; yy++) {
              if (dungeonMap[xx][yy].tile === 0) dungeonMap[xx][yy].tile = 2;
            }
          }
        }
      }
    };
  }

  function fillRoom(room, char) {
    const val = Math.random();
    const randomSquare  = {
      x: getRandom(room.x, room.x + room.w),
      y: getRandom(room.y,  room.y + room.h)
    };
    if (char) {
      return [randomSquare, char];
    } else {
      if (val < .4) {
        return [randomSquare, 'enemy1']
      } else if (val < .6) {
        return [randomSquare, 'health']
      } else if (val < .8) {
        return [randomSquare, 'enemy2']
      } else {
            return [randomSquare, 'item']
      }
    }
  }

  function playerLocation() {
    let playerLocation;
    dungeonMap.forEach((row, x) => {
      row.forEach((sqr, y) => {
        if(sqr.tile === 'player'){
          playerLocation =  {x: x, y: y};
        }
       });
     });
     return playerLocation;
  }

  function getRandom(low, high) {
      return~~ (Math.random() * (high - low)) + low;
  };

  return ({
    generate: generate,
    dungeonMap: dungeonMap,
    playerLocation: playerLocation
  })
})();

export default dungeon;
