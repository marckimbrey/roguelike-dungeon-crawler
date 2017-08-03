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

    ctx.clearRect(0,0, 900, 900);
    visableGrid.forEach((row, x) => {
      row.forEach((sqr, y)=> {
        if(this.isFloor(sqr.tile)) {
         ctx.drawImage(this.tile, 32, 16, 16, 16, x * 60, y*60, 60, 60);
        } else if (sqr.tile === 2) {
          ctx.drawImage(this.tile, 48, 0, 16, 16, x * 60, y*60, 60, 60);
        } else {
          ctx.fillStyle = '#222';
          ctx.fillRect(x * 60, y*60, 60, 60);
        }

        if (sqr.tile === 'enemy1'){
         ctx.drawImage(this.character, 0, 64, 16, 16, x * 60, y*60, 60, 60);
       }else if (sqr.tile === 'enemy2'){
         ctx.drawImage(this.character, 16*6, 64, 16, 16, x * 60, y*60, 60, 60);
       } else if (sqr.tile === 'player'){
         ctx.drawImage(this.character, 48, 0, 16, 16, x * 60, y*60, 60, 60);
       } else if (sqr.tile === 'boss'){
         ctx.drawImage(this.character, 144, 0, 16, 16, x * 60, y*60, 60, 60);
       }  else if (sqr.tile === 'health'){
         ctx.fillStyle = "red";
         ctx.fillRect(x * 60, y*60, 60, 60);
       }  else if (sqr.tile === 'item'){
         ctx.fillStyle = "silver";
         ctx.fillRect(x * 60, y*60, 60, 60);
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

  render() {
    return (<canvas ref="canvas" height={900} width={900}></canvas>)
  }
}
