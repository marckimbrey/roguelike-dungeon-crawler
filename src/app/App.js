import React, { Component } from 'react';

import './App.css';
import generateDungeon from '../dungeon';
import Canvas from '../canvas/Canvas';

class App extends Component {
  constructor() {
    super();
    this.state  = {
      dungeonMap: generateDungeon()
    }
  }
  render() {
    return (
      <div className="App">
        <Canvas dungeonMap={this.state.dungeonMap} />
      </div>
    );
  }
}

export default App;
