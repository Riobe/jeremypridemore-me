import React, { Component } from 'react';
import { titleCase } from '../../util';

import './New.css';

import General from './General';
import Attributes from './Attributes';
import CanRead from './CanRead';
import Abilities from './Abilities';
import BonusPoints from './BonusPoints';

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

    supernalAbility: '',

    abilities: {
      archery: { value: 0, favored: false },
      athletics: { value: 0, favored: false },
      awareness: { value: 0, favored: false },
      brawl: { value: 0, favored: false },
      bureaucracy: { value: 0, favored: false },
      craft: { value: 0, favored: false },
      dodge: { value: 0, favored: false },
      integrity: { value: 0, favored: false },
      investigation: { value: 0, favored: false },
      larceny: { value: 0, favored: false },
      linguistics: { value: 0, favored: false },
      lore: { value: 0, favored: false },
      martialArts: { value: 0, favored: false },
      medicine: { value: 0, favored: false },
      melee: { value: 0, favored: false },
      occult: { value: 0, favored: false },
      performance: { value: 0, favored: false },
      presence: { value: 0, favored: false },
      resistance: { value: 0, favored: false },
      ride: { value: 0, favored: false },
      sail: { value: 0, favored: false },
      socialize: { value: 0, favored: false },
      stealth: { value: 0, favored: false },
      survival: { value: 0, favored: false },
      thrown: { value: 0, favored: false },
      war: { value: 0, favored: false }
    },

    specialties: [],

    merits: [],

    charms: [],

    bonusPoints: [],
    
    currentStage: 3
  }

  getStageClasses = (index) => {
    const classes = ['New-stage card'];

    if (this.state.currentStage === index) { classes.push('show'); }
    else if (this.state.currentStage > index) { classes.push('previous'); }
    else { classes.push('next'); }

    return classes;
  }


  render() {
    const {
      general,
      attributes,
      attributePriorities,
      supernalAbility,
      abilities,
      currentStage
    } = this.state;

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
        description: 'These represent things like how strong you are, how smart you are, how attractive you are, etc. Make sure you choose a primary/secondary/tertiary value for every row, that tells you how many dots (points) you can put into each category. Hop over to the other tabs to use these.',
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
        subTitle: 'This uses 1 ability point to put into linguistics.',
        component: (
          <CanRead
            linguistics={abilities.linguistics.value}
            onChange={value => this.setState({
              abilities: {
                ...abilities,
                linguistics: { value, favored: abilities.linguistics.favored }
              }
            })}
          />
        )
      },

      {
        id: 'abilities',
        title: 'Abilities',
        subTitle: 'What can this character do?',
        description: 'You get 28 points to spend in any abilities you want. You can\'t raise an ability beyond 3 without spending bonus points though. Sorcery takes at least 3 in Occult, and martial arts requires 1 in brawl, and then a merit in a later step. You can also choose 10 favorited abilities that you can improve cheaper. 5 must be from your caste abilities, highlighted below until you choose them, and 5 can be from anything.',
        component: (
          <Abilities
            abilities={abilities}
            caste={general.caste}
            supernal={supernalAbility}
            onChange={value => this.setState({ abilities: value })}
            onCasteChange={value => this.setState({ general: { ...general, caste: value }})}
            onSupernalChange={value => this.setState({ supernalAbility: value })}
            onBonusPoints={event => debug(event)}
          />
        )
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
        subTitle: 'What needs filled out?',
        description: 'Is your character missing something cool? Not rounded out enough? Bonus points allow you to fill in the gaps to get your character to where you wanted them. You get 15 of them. Here\'s what you can spend them on, and how much each thing costs.',
        component: <BonusPoints />
      }
    ];

    const underConstruction = <div>Placeholder</div>;

    return (
      <div id="New">
        <div className="main-card card">

          <div className="card-body buttons">
            <div className="row justify-content-around">
              <a
                className="btn btn-primary text-light"
                rel="prev"
                role="button"
                style={{visibility: currentStage === 0 && 'hidden'}}
                onClick={() => {
                  const newStage = currentStage - 1;
                  debug(`Setting stage back to ${newStage}`);
                  this.setState({currentStage: newStage })
                }}>Previous</a>
              <a
                className="btn btn-primary text-light"
                rel="next"
                role="button"
                style={{visibility: currentStage === (stages.length - 1) && 'hidden'}}
                onClick={() => {
                  const newStage = currentStage + 1;
                  debug(`Setting stage to up ${newStage}`);
                  this.setState({currentStage: newStage })
                }}>Next</a>
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
