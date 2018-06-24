import React from 'react';

import { titleCase } from '../util';

import DotSet5 from './DotSet5';

export default function AttributeRow({name, attributeType, onValueChanged }) {
  return (
    <div className="col-12 row p-3">
      <div className="col">
        <p>{titleCase(name)}</p>

        <div className="row">
          {Object.keys(attributeType).map(attribute => (
            <div key={attribute} className="col">{titleCase(attribute)}</div>
          ))}
        </div>

        <div className="row">
          {Object.keys(attributeType).map(attribute => (
            <div key={attribute} className="col">
              <DotSet5
                value={attributeType[attribute]}
                onValueChanged={newValue => onValueChanged({attribute, newValue})}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
