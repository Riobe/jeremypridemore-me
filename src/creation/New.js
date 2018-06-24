import React, { Component } from 'react';

import { titleCase } from '../util';

import AttributeRow from './AttributeRow';
import DotSet5 from './DotSet5';

const debug = require('debug')('jeremypridemore-me:creation:New');

export default class New extends Component {
  state = {
    attributes: {
      physical: {
        strength: 1,
        dexterity: 1,
        stamina: 1
      },
      social: {
        charisma: 1,
        manipulation: 1,
        appearance: 1
      },
      mental: {
        perception: 1,
        intelligence: 1,
        wits: 1
      }
    },
    abilities: {
      archery: 0,
      athletics: 0,
      awareness: 0,
      brawl: 0,
      bureaucracy: 0,
      craft: 0,
      dodge: 0,
      integrity: 0,
      investigation: 0,
      larceny: 0,
      linguistics: 0,
      lore: 0,
      martialArts: 0,
      medicine: 0,
      melee: 0,
      occult: 0,
      performance: 0,
      presence: 0,
      resistance: 0,
      ride: 0,
      sail: 0,
      socialize: 0,
      stealth: 0,
      survival: 0,
      thrown: 0,
      war: 0
    }
  }

  handleAttributeChange = (type, attribute, value) => {
    const attributeValues = {...this.state.attributes};
    const typeValues = {...this.state.attributes[type]};
    this.setState({
      attributes: {
        ...attributeValues,
        [type]: {
          ...typeValues,
          [attribute]: value
        }
      }
    });
  }

  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col text-center">
            <h1 className="display-1">New Character</h1>
          </div>
        </div>

        <div className="row">
          <h3>Attributes</h3>
        </div>

        <div id="attributes" className="row shadow-lg">
          {Object.keys(this.state.attributes).map(type => (
            <AttributeRow
              key={type}
              name={type}
              attributeType={this.state.attributes[type]}
              onValueChanged={({attribute, newValue}) => this.handleAttributeChange(type, attribute, newValue)}
            />
          ))}
        </div>

        <div id="abilities" className="row p-3 shadow-lg">
          {Object.keys(this.state.abilities).map(ability => (
            <div className="ability w-100 row justify-content-start" key={ability}>
              <div className="ability-header col-2">{titleCase(ability)}</div>
              <DotSet5
                className="ability-value col-auto"
                value={this.state.abilities[ability]}
                onValueChanged={value => {
                  debug(`${ability} set to ${value}`);
                  const newState = {
                    abilities: {
                      ...this.state.abilities,
                      [ability]: value
                    }
                  };
                  debug('Setting state to:', newState);

                  this.setState(newState);
                }}
                clearable={true}
              />
            </div>
          ))}
        </div>

      </div>
    );
  }
}
