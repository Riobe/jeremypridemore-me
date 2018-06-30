import React, { Component } from 'react';
import { titleCase } from '../../util';

import './New.css';

import General from './General';
import Attributes from './Attributes';
import CanRead from './CanRead';

const debug = require('debug')('jeremypridemore-me:creation:New');

export default class New extends Component {
  state = {
    general: {
      name: '',
      player: '',
      caste: '',
      anima: '',
      concept: '',
      description: '',
    },

    attributePriorities: {
      primary: '',
      secondary: '',
      tertiary: '',
    },

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
    },

    specialties: [],

    merits: [],

    charms: [],

    bonusPoints: [],
    
    currentStage: 2
  }

  getStageClasses = (index) => {
    const classes = ['New-stage card'];

    if (this.state.currentStage === index) { classes.push('show'); }
    else if (this.state.currentStage > index) { classes.push('previous'); }
    else { classes.push('next'); }

    return classes;
  }


  render() {
    const { general, attributes, attributePriorities, currentStage } = this.state;

    const stages = [
      {
        id: 'general',
        title: 'General Character Info',
        subTitle: 'Who is this character?',
        component: <General general={general} onChange={value => this.setState({general: value})} />
      },

      {
        id: 'attributes',
        title: 'Attributes',
        subTitle: 'What is this character innately like?',
        description: 'These represent things like how strong you are, how smart you are, how hot you are, etc. Make sure you choose a primary/secondary/tertiary value for every row, that tells you how many dots (points) you can put into each category.',
        component: (
          <Attributes
            attributes={attributes}
            precedence={attributePriorities}
            onChange={value => this.setState({attributes: value})}
            onPrecedenceChange={value => this.setState({attributePriorities: value})}
          />
        )
      },

      {
        id: 'can-read',
        title: 'Can this character read?',
        subTitle: 'This will take 1 of your ability points.',
        component: (
          <CanRead
            linguistics={this.state.abilities.linguistics}
            onChange={value => this.setState({
              abilities: {
                ...this.abilities,
                linguistics: value
              }
            })}
          />
        )
      },

      {
        id: 'abilities',
        title: 'Abilities',
        subTitle: 'What can this character do?'
      },

      {
        id: 'specialties',
        title: 'Specialties',
        subTitle: 'What is this character particularly good at?'
      },

      {
        id: 'merits',
        title: 'Merits',
        subTitle: 'What is noteworthy about this character?'
      },

      {
        id: 'charms',
        title: 'Charms',
        subTitle: 'What kind of magic can this character do?'
      },

      {
        id: 'limit',
        title: 'Limit Trigger & Break',
        subTitle: 'How does the great curse affect this character?'
      },

      {
        id: 'intimacies',
        title: 'Intimacies',
        subTitle: 'What does your character care about?'
      },

      {
        id: 'bonus',
        title: 'Bonus Points',
        subTitle: 'What needs filled out?'
      }
    ];

    const underConstruction = <div>Placeholder</div>;

    return (
      <div id="New">
        <div className="main-card card">

          <div className="card-body buttons">
            <div className="row justify-content-around">
              <button
                className="btn btn-primary"
                type="button"
                style={{visibility: currentStage === 0 && 'hidden'}}
                onClick={() => {
                  const newStage = currentStage - 1;
                  debug(`Setting stage back to ${newStage}`);
                  this.setState({currentStage: newStage })
                }}>Previous</button>
              <button
                className="btn btn-primary"
                type="button"
                style={{visibility: currentStage === (stages.length - 1) && 'hidden'}}
                onClick={() => {
                  const newStage = currentStage + 1;
                  debug(`Setting stage to up ${newStage}`);
                  this.setState({currentStage: newStage })
                }}>Next</button>
            </div>
          </div>

          <div className="card-body content">
            {stages.map((stage, index) => (
                <div
                  id={`New-stage-${stage.title}`}
                  className="New-stage card"
                  key={stage.title}
                  style={{
                    transform: `translate(calc(-${currentStage * 100}% - ${currentStage * 50}px))`
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{titleCase(stage.title)}</h5>
                    <h6 className="card-subtitle text-muted">{stage.subTitle}</h6>
                    {stage.description && (
                      <div className="row mt-2">
                        <p className="col col-md-6">{stage.description}</p>
                      </div>
                    )}
                    {stage.component || underConstruction}
                  </div>
                </div>
            ))}
          </div>

        </div>
      </div>
    );
  }
}
