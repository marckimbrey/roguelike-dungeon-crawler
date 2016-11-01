import React, {Component} from 'react';

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
        if(sqr === 1.5) {
          ctx.fillStyle = "red";
          ctx.fillRect(x * 15, y*15, 15, 15);
        } else if (sqr === 2) {
          ctx.fillStyle = "grey";
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
