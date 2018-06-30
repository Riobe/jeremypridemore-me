import React from 'react';

import { titleCase } from '../util';

import DotSet5 from './DotSet5';

const pointsIn = attributes => {
  return Object.keys(attributes).reduce((sum, attribute) => {
    return sum + attributes[attribute];
  }, 0);
};

const pointsForPrecence = precedence => {
  switch(precedence) {
    case 'primary':
      return 8;
    case 'secondary':
      return 6;
    case 'tertiary':
      return 4
    default:
      return 0;
  }
};

const pointsLeft = (attributes, max) => {
  if (!max) { return 0; }

  // We up the max by 3 because you get a free 1 in each attribute.
  return (max + 3) - pointsIn(attributes);
};

const pointsDisplay = (attributes, precedence) => {
  if (!precedence) { return ''; }

  const max = pointsForPrecence(precedence);
  const remaining = pointsLeft(attributes, max);

  return `${remaining}/${max}`;
}

export default function AttributeRow({name, precedence, attributeType, onValueChanged, onPrecedenceChange }) {
  return (
    <div className="AttributeRow mb-3">
      <div className="row justify-content-start">
        <div className="col-12 col-md-1">{titleCase(name) + ' ' + pointsDisplay(attributeType, precedence)}</div>
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
