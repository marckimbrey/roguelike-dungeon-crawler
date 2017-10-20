import React, {Component} from 'react';
import tiles from '../assets/basictiles.png';
import characters from '../assets/characters.png';

export default class extends Component {
  constructor(props) {
    super();

  }

  componentDidMount() {

    this.tile = new Image( 128, 140);
    this.character = new Image()
    this.tile.addEventListener('load',
      this.updateCanvas(this.props.dungeonMap, this.props.playerLocation)
    );
    this.tile.src = tiles;
    this.character.src = characters;




  }
  componentDidUpdate() {

    this.updateCanvas(this.props.dungeonMap, this.props.playerLocation);
  }
  updateCanvas(grid, playerLocation) {
    const gridSize = 900;
    const sqrSize = 60;
    const srcSqr = 16;

    let visableGrid = grid.filter((row, x) => {
      if (playerLocation.x -7 < 0) {
        return x <= 14;
      } else if (playerLocation.x +7 > row.length -1) {
        return x >= row.length -15;
      } else {
        return x >= playerLocation.x -7 && x <= playerLocation.x +7;
      }

    }).map((row) => {
      return row.filter((sqr, y) => {
        if (playerLocation.y -7 < 0) {
          return y <= 14;
        } else if (playerLocation.y +7 > row.length -1) {
          return y >= row.length -15;
        } else {
          return y >= playerLocation.y -7 && y <= playerLocation.y +7;
        }
      });
    });

    const ctx = this.refs.canvas.getContext('2d');
    let charImg;
    ctx.clearRect(0,0, gridSize, gridSize);
    visableGrid.forEach((row, x) => {
      row.forEach((sqr, y)=> {
        if(this.isFloor(sqr.tile)) { // dungeon floor
         ctx.drawImage(this.tile, 32, 16, srcSqr, srcSqr, x*sqrSize, y*sqrSize, sqrSize, sqrSize);
       } else if (sqr.tile === 2) { // walls of dungeon
          ctx.drawImage(this.tile, 48, 0, srcSqr, srcSqr, x*sqrSize, y*sqrSize, sqrSize, sqrSize);
        } else { // empty spaces outside the dungeon
          ctx.fillStyle = '#222';
          ctx.fillRect(x*sqrSize, y*sqrSize, sqrSize, sqrSize);
        }
        if (sqr.enemy) {
          if (sqr.tile === 'enemy1'){
            charImg = this.getCharImg(sqr.enemy.type, sqr.enemy.facing);
           ctx.drawImage(this.character, charImg.x, charImg.y, srcSqr, srcSqr, x*sqrSize, y*sqrSize, sqrSize, sqrSize);
         }  else if (sqr.tile === 'enemy2'){
           charImg = this.getCharImg(sqr.enemy.type, sqr.enemy.facing);
           ctx.drawImage(this.character, charImg.x, charImg.y, srcSqr, srcSqr, x*sqrSize, y*sqrSize, sqrSize, sqrSize);
         }  else if (sqr.tile === 'boss'){
           charImg = this.getCharImg(sqr.enemy.type, sqr.enemy.facing);
           ctx.drawImage(this.character, charImg.x, charImg.y, srcSqr, srcSqr, x*sqrSize, y*sqrSize, sqrSize, sqrSize);
         }
        } else if (sqr.tile === 'player'){
          charImg = this.getCharImg('player', this.props.playerDirection)
          ctx.drawImage(this.character, charImg.x, charImg.y, srcSqr, srcSqr, x*sqrSize, y*sqrSize, sqrSize, sqrSize);
        } else if (sqr.tile === 'item' || sqr.tile === 'health'){
         ctx.drawImage(this.tile, 64, 64, srcSqr, srcSqr, x*sqrSize, y*sqrSize, sqrSize, sqrSize);
       }


      });
    });
  }

  isFloor(tile) {
    const floorTile = [1, 'player', 'enemy1', 'enemy2',
      'boss', 'health', 'item'
    ];
    let isFloor = false;
    floorTile.forEach((x) =>{
      if(x === tile) {
        isFloor = true;
      }
    });
    return isFloor;
  }

  getCharImg(char, facing) {
    let imgPos;
    const player = {
      'up': {x : 48, y : 48},
      'up2': {x : 80, y : 48},
      'right': {x : 48, y : 32},
      'right2': {x : 80, y : 32},
      'down': {x : 48, y : 0},
      'down2': {x : 80, y : 0},
      'left': {x : 48, y : 16},
      'left2': {x : 80, y : 16},
    };

    const boss ={
      'up': {x : 144, y : 48},
      'up2': {x : 176, y : 48},
      'right': {x : 144, y : 32},
      'right2': {x : 176, y : 32},
      'down': {x : 144, y : 0},
      'down2': {x : 176, y : 0},
      'left': {x : 144, y : 16},
      'left2': {x : 176, y : 16},
    };

    const enemy1 = {
      'up': {x : 0, y : 112},
      'up2': {x : 32, y : 112},
      'right': {x : 0, y : 96},
      'right2': {x : 32, y : 96},
      'down': {x : 0, y : 64},
      'down2': {x : 32, y : 64},
      'left': {x : 0, y : 80},
      'left2': {x : 32, y : 80},
    };

    const enemy2 ={
      'up': {x : 96, y : 112},
      'up2': {x : 128, y : 112},
      'right': {x : 96, y : 96},
      'right2': {x : 128, y : 96},
      'down': {x : 96, y : 64},
      'down2': {x : 128, y : 64},
      'left': {x : 96, y : 80},
      'left2': {x : 128, y : 80},
    };
    switch(char)  {
      case 'player':
        imgPos = player[facing];
        break;
      case 'boss':
        imgPos = boss[facing];;
        break
      case 'enemy1':
        imgPos = enemy1[facing];
        break;
      case 'enemy2':
        imgPos = enemy2[facing];
        break;
      default:
      console.log(char, facing);
        imgPos= null;
        break;
    }

    return imgPos;

  }


  render() {
    return (<canvas ref="canvas" height={900} width={900}></canvas>)
  }
}
