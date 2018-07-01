import React from 'react';

import DotSet5 from '../DotSet5';

const debug = require('debug')('jeremypridemore-me:creation:New:Abilities');

export default function Abilities({ abilities, onChange, onBonusPoints }) {
  const abilityNames = Object.keys(abilities);

  const abilityRow = ability => (
    <div className="ability row col justify-content-between mb-2" key={ability}>
      <div className="ability-header col-auto text-capitalize">{ability}</div>
      <DotSet5
        className="ability-value col-auto"
        value={abilities[ability]}
        onValueChanged={value => {
          if (!onChange) { return; }
          debug(`${ability} set to ${value}`);
          const newState = {
            ...abilities,
            [ability]: value
          };

          onChange(newState);
        }}
        clearable={true}
      />
    </div>
  );

  return (
    <div id="Abilities" className="row my-5 mb-0 shadow-lg">
      <div className="col-12 col-md-4 shadow p-2">
        {abilityNames.slice(0, abilityNames.length / 2).map(ability => abilityRow(ability))}
      </div>
      <div className="col-12 col-md-4 shadow p-2">
        {abilityNames.slice((abilityNames.length / 2) + 1, abilityNames.length).map(ability => abilityRow(ability))}
      </div>
    </div>
  );
}
