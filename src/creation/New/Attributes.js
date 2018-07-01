import React, { Component } from 'react';

import AttributeRow from '../AttributeRow';

const debug = require('debug')('jeremypridemore-me:creation:New:Attributes');

export default class Attributes extends Component {
  handleAttributePrecedence = (type, newPrecedence) => {
    const { precedence, onPrecedenceChange } = this.props;
    if (!onPrecedenceChange) { return; }

    const previousAttribute = precedence[newPrecedence];

    // Can't unselect after selected, can only move.
    if (previousAttribute === type) { return; }

    const currentPrecdence = this.getAttributePrecedence(type);

    // This type doesn't already have a precedence, and there was no previous
    // attribute where it wants to go. Just put it there.
    if (!previousAttribute && !currentPrecdence) {
      const simpleChanges = {
        ...precedence,
        [newPrecedence]: type
      };
      debug('Changing attribute precedence', simpleChanges);
      return onPrecedenceChange(simpleChanges);
    }

    const changes = {
      ...precedence,
      [newPrecedence]: type,
    };

    if (currentPrecdence) {
      // If the value you're moving to has no value, then you have to set where
      // you are right now to empty, or you'll put the type into two different
      // precedences.
      changes[currentPrecdence] = previousAttribute !== type ? previousAttribute : ''
    }

    debug('Changing attribute precedence', changes);

    onPrecedenceChange(changes);
  }

  // There has to be a cleaner way to do this...
  getAttributePrecedence = type => {
    const { precedence } = this.props;
    if (precedence.primary === type) { return 'primary'; }
    if (precedence.secondary === type) { return 'secondary'; }
    if (precedence.tertiary === type) { return 'tertiary'; }
    return '';
  }

  render() {
    const { attributes, onChange } = this.props;

    return (
      <div id="attributes" className="row p-3 shadow-lg">
        <div className="col">
          {Object.keys(attributes).map(type => (
            <AttributeRow
              key={type}
              name={type}
              attributeType={attributes[type]}
              precedence={this.getAttributePrecedence(type)}
              onValueChanged={({ attribute, newValue}) => {
                debug(`Changing ${attribute} to ${newValue}`);
                if (!onChange) { return; }

                onChange({
                  attributes: {
                    ...attributes,
                    [type]: {
                      ...attributes[type],
                      [attribute]: newValue
                    }
                  },
                  type,
                  name: attribute
                });
              }}
              onPrecedenceChange={precedence => this.handleAttributePrecedence(type, precedence)}
            />
          ))}
        </div>
      </div>
    );
  }
}
