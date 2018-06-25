import React from 'react';

import { titleCase } from '../util';

import DotSet5 from './DotSet5';

export default function AttributeRow({name, precedence, attributeType, onValueChanged, onPrecedenceChange }) {
  return (
    <div className="AttributeRow mb-3">
      <div className="row justify-content-start">
        <div className="col-12 col-md-1">{titleCase(name)}</div>
        {[{text: 'primary', className: ' btn-primary'},
          {text: 'secondary', className: ' btn-info'},
          {text: 'tertiary', className: ' btn-secondary'}].map(possiblePrecedence => (
          <button
            key={possiblePrecedence.text}
            className={'btn btn-sm mx-2' + (possiblePrecedence.text === precedence ? possiblePrecedence.className : ' btn-light')}
            type="button"
            onClick={() => onPrecedenceChange && onPrecedenceChange(possiblePrecedence.text)}
          >{titleCase(possiblePrecedence.text)}</button>
        ))}
      </div>

      <div className="row">
        {Object.keys(attributeType).map(attribute => (
          <div
            key={attribute}
            className="col-12 col-md"
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
