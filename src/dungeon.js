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
        dungeonMap[x][y] = 0;
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

      dungeonMap[pointB.x][pointB.y] = 1;
    }
  };

  // set insides of rooms = 1
  for (let i=0; i<roomCount; i++) {
    const curRoom = rooms[i];
    for(let x=curRoom.x; x<curRoom.x +curRoom.w; x++) {
      for(let y=curRoom.y; y<curRoom.y +curRoom.h; y++) {
        dungeonMap[x][y] = 1
      }
    }
  };
  /*iterates through all the tiles in the map and if it finds a tile that is  =1
  check all the surrounding tiles for empty values. If we find an empty tile
  (that touches the floor) we build a wall =2.*/
  for(let x=0; x<mapSize; x++) {
    for(let  y=0; y<mapSize; y++) {
      if (dungeonMap[x][y] === 1) {
        for (let xx = x - 1; xx <= x + 1; xx++) {
          for (let yy = y - 1; yy <= y + 1; yy++) {
            if (dungeonMap[xx][yy] === 0) dungeonMap[xx][yy] = 2;
          }
        }
      }
    }
  };

  let firstSquare = [];

  // find first square of room or corridor
  for (let x=0; x<dungeonMap.length; x++){
    for(let y=0; y<dungeonMap[0].length; y++) {
      if (dungeonMap[x][y] === 1) {
        firstSquare = [x,y];
        break;
      }
    };
    if (firstSquare.length > 1) {
      break;
    }
  };
  // floodFill recursively checks adjacient squares to see if any rooms aren't connected
  let checkMap =  floodFill(dungeonMap, firstSquare[0], firstSquare[1]);
  let connected = true;

  for (let x=0; x<checkMap.length; x++) {
    for (let y=0; y<checkMap[0].length; y++) {
       if (checkMap[x][y] === 1) {
         connected = false;
         break;
       }
    };
    if(!connected) {
      break;
    }
  };

  if (connected === false) {
    GenerateDungeon();
  } else {
    return dungeonMap;
  }
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

function floodFill(mapData , x, y) {
  const mapWidth = mapData.length,
    mapHeight = mapData[0].length;
    if(mapData[x][y] === 1) {
      mapData[x][y] = 1.5;
      if (x > 0){ // left
         floodFill(mapData, x-1, y);
      }
      if(y > 0){ // up
          floodFill(mapData, x, y-1);
      }
      if(x < mapWidth-1){ // right
          floodFill(mapData, x+1, y);
      }
      if(y < mapHeight-1){ // down
          floodFill(mapData, x, y+1);
      }
      return mapData;
    }


}
