import React from 'react';

import './PlayerStats.css';

export default (props) => {

  return (
    <div className="playerStats">
      <div>Health: {props.player.health}</div>
      <div>Attack: {props.player.attack + props.player.weapon.attack}</div>
      <div>Weapon: {props.player.weapon.name}</div>
      <div>Level: {props.player.level}</div>
    </div>

  );

}
