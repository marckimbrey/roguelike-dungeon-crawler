import React, {Component} from 'react';

export default class extends Component {
  constructor(props) {
    super();
    console.log(props);
  }

  render() {
    return (<canvas height='900' width='900'></canvas>)
  }
}
