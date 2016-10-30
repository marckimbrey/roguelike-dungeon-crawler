const getRandom = (low, high) =>{
    return~~ (Math.random() * (high - low)) + low;
};

export default function GenerateDungeon() {
  let dungeonMap = [];
  const mapSize = 100;
  let rooms = [];

  const roomCount = getRandom(15,30);
  const minSize = 7;
  const maxSize = 22;


  for(let x=0; x<mapSize; x++) {
    dungeonMap[x] = [];
    for(let y=0; y<mapSize; y++) {
        dungeonMap[x][y] = 0;
    }
  };

  for(let i=0; i<roomCount; i++) {
    const room = {};
    room.x = getRandom(1, mapSize - maxSize - 1);
    room.y = getRandom(1, mapSize - maxSize - 1);
    room.w = getRandom(minSize, maxSize);
    room.h = getRandom(minSize, maxSize);

    if(DoesCollide(room, rooms, i)) {
      i--;
      continue;
    }
    // to make sure rooms are not directly next ro each other
    room.w--;
    room.h--;

    rooms.push(room);
  };
  // SquashRooms(rooms);

  for(let i=0; i<roomCount; i++) {
    const roomA = rooms[i];
    const roomB = FindClosestRoom(roomA, rooms);

    let pointA = {
      x: getRandom(roomA.x, roomA.x + roomA.w),
      y: getRandom(roomA.y,  roomA.y + roomA.h)
    };
    let pointB = {
      x: getRandom(roomB.x, roomB.x + roomB.w),
      y: getRandom(roomB.y,  roomB.y + roomB.h)
    };

    while (pointB.x != pointA.x || pointB.y != pointA.y) {
      if (pointA.x != pointB.x) {
        if(pointB.x > pointA.x) pointB.x--;
        else pointB.x++;
      } else if (pointB.y != pointA.y) {
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
      if (dungeonMap[x][y] == 1) {
        for (let xx = x - 1; xx <= x + 1; xx++) {
          for (let yy = y - 1; yy <= y + 1; yy++) {
            if (dungeonMap[xx][yy] == 0) dungeonMap[xx][yy] = 2;
          }
        }
      }
    }
  };

  return dungeonMap;
}

function FindClosestRoom(room,rooms) {
  let mid = {
    x: room.x + (room.w /2 ),
    y: room.y + (room.h / 2)
  };
  let closest = null;
  let closestDistance = 1000;
  for (let i=0; i< rooms.length; i++) {
    let check = rooms[i];
    if (check == room) continue;
    let checkMid = {
      x: check.x + (check.w / 2),
      y: check.y + (check.h / 2)
    };
    let distance = Math.abs(mid.x -checkMid.x) + Math.abs(mid.y - checkMid.y);
    if (distance < closestDistance) {
      closestDistance = distance;
      closest = check;
    }
  }
  return closest;

}

function SquashRooms(rooms) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < rooms.length; j++) {
        let room = rooms[j];
        while (true) {
            let old_position = {
                x: room.x,
                y: room.y
            };
            if (room.x > 1) room.x--;
            if (room.y > 1) room.y--;
            if ((room.x == 1) && (room.y == 1)) break;
            if (DoesCollide(room, rooms, j)) {
                room.x = old_position.x;
                room.y = old_position.y;
                break;
            }
        }
    }
  }
}

function DoesCollide(room, rooms, ignore) {
  for(let i=0; i<rooms.length; i++) {
    if (i == ignore) continue;
    let check = rooms[i];
    if (!((room.x + room.w < check.x) || (room.x > check.x + check.w) ||
    (room.y + room.h < check.y) || (room.y > check.y + check.h))) return true;
  }
  return false
}


// let dungeon = {
//   map: null,
//   mapSize: 100,
//   rooms: [],
//
//   Generate: ()=> {
//     this.map = [];
//     for(let x=0; x<this.mapSize; x++) {
//       this.map[x] = [];
//       for(let y=0; y<this.mapSize; y++) {
//           this.map[x][y] = 0;
//       }
//     }
//     const roomCount = getRandom(15,30);
//     const minSize = 7;
//     const maxSize = 22;
//
//     for(let i=0; i<roomCount; i++) {
//       const room = {};
//       room.x = getRandom(1, this.mapSize - maxSize - 1);
//       room.y = getRandom(1, this.mapSize - maxSize - 1);
//       room.w = getRandom(minSize, maxSize);
//       room.h = getRandom(minSize, maxSize);
//
//       if(this.DoesCollide(room)) {
//         i--;
//       }
//       // to make sure rooms are not directly next ro each other
//       room.w--;
//       room.h--;
//
//       this.rooms.push(room);
//     }
//
//     // this.SquashRooms(); // moves rooms closer to each other
//
//
//     for(let i=0; i<roomCount; i++) {
//       const roomA = this.rooms[i];
//       const roomB = this.FindClosestRoom(roomA);
//
//       let pointA = {
//         x: getRandom(roomA.x, roomA.x + roomA.w),
//         y: getRandom(roomA.y,  roomA.y + roomA.h)
//       }
//       let pointB = {
//         x: getRandom(roomB.x, roomB.x + roomB.w),
//         y: getRandom(roomB.y,  roomB.y + roomB.h)
//       }
//       while (pointB.x != pointA.x || pointB.y != pointA.y) {
//         if (pointA.x != pointB.x) {
//           if(pointB.x > pointA.x) pointB.x--;
//           else pointB.x++;
//         } else if (pointB.y != pointA.y) {
//           if(pointB.y > pointA.y) pointB.y--;
//           else pointB.y++;
//         }
//
//         this.map[pointB.x][pointB.y] = 1;
//       }
//     }
//
//     // set insides of rooms = 1
//     for (let i=0; i<roomCount; i++) {
//       const room = room[i];
//       for(let x=room.x; x<room.x +room.w; x++) {
//         for(let y=room.y; y<room.y +room.h; y++) {
//           this.map[x][y] = 1
//         }
//       }
//     }
//
//     /*iterates through all the tiles in the map and if it finds a tile that is  =1
//     check all the surrounding tiles for empty values. If we find an empty tile
//     (that touches the floor) we build a wall =2.*/
//     for(let x=0; x<this.mapSize; x++) {
//       for(let  y=0; y<this.mapSize; y++) {
//         if (this.map[x][y] == 1) {
//           for (let xx = x - 1; xx <= x + 1; xx++) {
//             for (let yy = y - 1; yy <= y + 1; yy++) {
//               if (this.map[xx][yy] == 0) this.map[xx][yy] = 2;
//             }
//           }
//         }
//       }
//     }
//   },
//
//   FindClosestRoom: (room) => {
//     let mid = {
//       x: room.x + (room.w /2 ),
//       y: room.y + (room.h / 2)
//     };
//     let closest = null;
//     let closestDistance = 1000;
//     for (let i=0; i< this.rooms.length; i++) {
//       let check = this.rooms[i];
//       if (check == room) continue;
//       let checkMid = {
//         x: check.x + (check.w / 2),
//         y: check.y + (check.h / 2)
//       };
//       let distance = Math.abs(mid.x -checkMid.x) + Math.abs(mid.y - checkMid.y);
//       if (distance < closestDistance) {
//         closestDistance = distance;
//         closest = check;
//       }
//     }
//     return closest;
//
//   },
//
//   SquashRooms: ()=> {
//   },
//
//   DoesCollide: (room, ignore)=> {
//     for(let i=0; i<this.rooms.length; i++) {
//       if (i == ignore) continue;
//       var check = this.rooms[i];
//       if (!((room.x + room.w < check.x) || (room.x > check.x + check.w) ||
//       (room.y + room.h < check.y) || (room.y > check.y + check.h))) return true;
//     }
//     return false
//   }
//
// };
