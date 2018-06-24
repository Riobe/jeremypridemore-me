import React from 'react';
import DotSet5 from './DotSet5';
import { titleCase } from '../util';

export default function AttributeRow({name, attributeType, onValueChanged }) {
  return (
    <div className="row p-3">
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
