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
  }
  componentDidMount() {
    this.updateCanvas(this.dungeon);
  }
  componentWillUpdate() {

  }
  updateCanvas(grid) {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0,0, 900, 900);
    grid.forEach((row, x) => {
      row.forEach((sqr, y)=> {
        if(sqr.tile === 1) {
          ctx.fillStyle = "red";
          ctx.fillRect(x * 15, y*15, 15, 15);
        } else if (sqr.tile === 2) {
          ctx.fillStyle = "grey";
          ctx.fillRect(x*15, y*15, 15, 15);
        } else if (sqr.tile === 3){
          ctx.fillStyle = "blue";
          ctx.fillRect(x*15, y*15, 15, 15);
        }else if (sqr.tile === 4){
          ctx.fillStyle = "green";
          ctx.fillRect(x*15, y*15, 15, 15);
        } else if (sqr.tile === 5){
          ctx.fillStyle = "yellow";
          ctx.fillRect(x*15, y*15, 15, 15);
        } else {
          ctx.fillStyle = '#111';
          ctx.fillRect(x*15, y*15, 15, 15);
        }
      });
    });
  }

  render() {
    return (<canvas ref="canvas" height={900} width={900}></canvas>)
  }
}
