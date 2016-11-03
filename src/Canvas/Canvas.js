import React, {Component} from 'react';
// 1.5 = floor
// 2 = wall
// 3 = enemy
// 4 = enemy2
// 5 = item
export default class extends Component {
  constructor(props) {
    super();
    this.dungeon = props.dungeonMap;
    this.playerLocation = props.playerLocation;
  }
  componentDidMount() {
    this.updateCanvas(this.dungeon, this.playerLocation);

  }
  componentWillUpdate() {

  }
  updateCanvas(grid, playerLocation) {
    let visableGrid = grid.filter((row, x) => {
      console.log(playerLocation.x +7);
      if (playerLocation.x -7 < 0) {
        return x <= 14;
      } else if (playerLocation.x +7 > row.length -1) {
        return x >= row.length -15;
      } else {
        return x >= playerLocation.x -7 && x <= playerLocation.x +7;
      }

    }).map((row) => {
      return row.filter((sqr, y) => {
              console.log(playerLocation.y);
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
        if(sqr.tile === 1) {
          ctx.fillStyle = "red";
          ctx.fillRect(x * 60, y*60, 60, 60);
        } else if (sqr.tile === 2) {
          ctx.fillStyle = "grey";
          ctx.fillRect(x * 60, y*60, 60, 60);
        } else if (sqr.tile === 3){
          ctx.fillStyle = "blue";
          ctx.fillRect(x * 60, y*60, 60, 60);
        }else if (sqr.tile === 4){
          ctx.fillStyle = "green";
          ctx.fillRect(x * 60, y*60, 60, 60);
        } else if (sqr.tile === 'player'){
          ctx.fillStyle = "yellow";
          ctx.fillRect(x * 60, y*60, 60, 60);
        } else {
          ctx.fillStyle = '#111';
          ctx.fillRect(x * 60, y*60, 60, 60);
        }
      });
    });
  }

  render() {
    return (<canvas ref="canvas" height={900} width={900}></canvas>)
  }
}
