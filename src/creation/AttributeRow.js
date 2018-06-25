import React from 'react';

import { titleCase } from '../util';

import DotSet5 from './DotSet5';

export default function AttributeRow({name, attributeType, onValueChanged }) {
  return (
    <div className="AttributeRow mb-3">
      <div className="row justify-content-start">
        <div>{titleCase(name)}</div>
        <button className="btn btn-light btn-sm mx-2" type="button">Primary</button>
        <button className="btn btn-light btn-sm mx-2" type="button">Secondary</button>
        <button className="btn btn-light btn-sm mx-2" type="button">Tertiary</button>
      </div>

      <div className="row">
        {Object.keys(attributeType).map(attribute => (
          <div
            key={attribute}
            className="col col-sm-12"
          >
            <div>{titleCase(attribute)}</div>
            <DotSet5
              value={attributeType[attribute]}
              onValueChanged={newValue => onValueChanged({attribute, newValue})}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
