import React, {Component} from 'react';

import './mobileControls.css';

export default class extends Component {


  render() {
    return (
      <div className="mobile-controls">
        <button className="mobile-btn up" onClick={() =>this.props.btnPressed(38)}>&#8593;</button>
        <button className="mobile-btn left" onClick={() =>this.props.btnPressed(37)}>&#8592;</button>
        <button className="mobile-btn right" onClick={() =>this.props.btnPressed(39)}>&#8594;</button>
        <button className="mobile-btn down" onClick={() =>this.props.btnPressed(40)}>&#8595;</button>
      </div>
    );

  }
}
