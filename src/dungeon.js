const getRandom = (low, high) =>{
    return~~ (Math.random() * (high - low)) + low;
};

export default function GenerateDungeon() {
  let dungeonMap = [];
  const mapSize = 60;
  let rooms = [];

  const roomCount = getRandom(11,20);
  const minSize = 5;
  const maxSize = 15;

  // create 2 dimentional array
  for(let x=0; x<mapSize; x++) {
    dungeonMap[x] = [];
    for(let y=0; y<mapSize; y++) {
        dungeonMap[x][y] = {tile: 0};
    }
  };
  // add random sized rooms
  for(let i=0; i<roomCount; i++) {
    const room = {};
    room.x = getRandom(1, mapSize - maxSize - 1);
    room.y = getRandom(1, mapSize - maxSize - 1);
    room.w = getRandom(minSize, maxSize);
    room.h = getRandom(minSize, maxSize);
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
    const roomA = rooms[i];
    const roomB = rooms[i+1];

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
  };

  // set insides of rooms = 1
  rooms.forEach((room) => {
    for(let x=room.x; x<room.x +room.w; x++) {
      for(let y=room.y; y<room.y +room.h; y++) {
        dungeonMap[x][y].tile = 1
      }
    }
  });
  /*iterates through all the tiles in the map and if it finds a tile that is  =1
  check all the surrounding tiles for empty values. If we find an empty tile
  (that touches the floor) we build a wall =2.*/
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

    rooms.forEach((room) => {
      const newVal = fillRoom(room);
      dungeonMap[newVal[0].x][newVal[0].y].tile = newVal[1];
    });
  return dungeonMap;
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

function fillRoom(room) {
  const val = Math.random();
  const randomSquare  = {
    x: getRandom(room.x, room.x + room.w),
    y: getRandom(room.y,  room.y + room.h)
  };
  if (val < .5) {
    return [randomSquare, 3]
  } else if (val < .8) {
        return [randomSquare, 4]
  } else {
        return [randomSquare, 5]
  }


}
