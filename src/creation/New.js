import React, { Component } from 'react';

import { titleCase, controlFor } from '../util';
import { CASTE } from '../constants';

import AttributeRow from './AttributeRow';
import DotSet5 from './DotSet5';

const debug = require('debug')('jeremypridemore-me:creation:New');

export default class New extends Component {
  state = {
    name: '',
    player: '',
    caste: '',
    anima: '',
    concept: '',
    description: '',

    attributes: {
      primary: '',
      secondary: '',
      tertiary: '',

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
      <div className="container mt-5">

        <div className="row mb-2">
          <form className="col">
            <div className="form-row">
              <div className="col">
                <div className="row align-items-end">
                  <label className="col-auto" htmlFor="name">Character:</label>
                  <input
                    id="name"
                    className="form-control col"
                    type="text"
                    value={this.state.name}
                    onChange={controlFor(this, 'name')}
                  />
                </div>
              </div>

              <div className="col mx-3">
                <div className="row align-items-end">
                  <label className="col-auto" htmlFor="player">Player:</label>
                  <input
                    id="player"
                    className="form-control col"
                    type="text"
                    value={this.state.player}
                    onChange={controlFor(this, 'player')}
                  />
                </div>
              </div>

              <div className="col">
                <select
                  id="caste"
                  className="form-control"
                  value={this.state.caste}
                  onChange={event => {
                    debug(`caste changed to: ${event.target.value}`);
                    this.setState({ caste: event.target.value });
                  }}
                >
                  <option value="" disabled hidden>Caste</option>
                  {Object.values(CASTE).map(caste => (
                    <option key={caste} value={caste}>{caste}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="col">
                <div className="row align-items-end">
                  <label className="col-auto" htmlFor="anima">Anima:</label>
                  <input
                    id="anima"
                    className="form-control col"
                    type="text"
                    value={this.state.anima}
                    onChange={controlFor(this, 'anima')}
                  />
                </div>
              </div>

              <div className="col mx-3">
                <div className="row align-items-end">
                  <label className="col-auto" htmlFor="concept">Concept:</label>
                  <input
                    id="concept"
                    className="form-control col"
                    type="text"
                    value={this.state.concept}
                    onChange={controlFor(this, 'concept')}
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <label className="col-auto" htmlFor="player">Description</label>
              <textarea
                id="description"
                class="form-control"
                rows="4"
                value={this.state.description}
                onChange={controlFor(this, 'description')}
              ></textarea>
            </div>
          </form>
        </div>

        <div className="row">
          <h3>Attributes</h3>
        </div>

        <div id="attributes" className="row p-3 shadow-lg">
          <div className="col">
            {['physical', 'social', 'mental'].map(type => (
              <AttributeRow
                key={type}
                name={type}
                attributeType={this.state.attributes[type]}
                onValueChanged={({attribute, newValue}) => this.handleAttributeChange(type, attribute, newValue)}
              />
            ))}
          </div>
        </div>

        <div id="abilities" className="row my-5 mb-0 shadow-lg">
          <div className="col-4 shadow p-2">
            <div className="row">
              <h4 className="col">Abilities</h4>
            </div>
            {Object.keys(this.state.abilities).map(ability => (
              <div className="ability row col justify-content-between mb-2" key={ability}>
                <div className="ability-header col-auto">{titleCase(ability)}</div>
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

      </div>
    );
  }
}
