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
      athletics: { value: 3, favored: false },
      awareness: { value: 3, favored: false },
      brawl: { value: 3, favored: false },
      bureaucracy: { value: 3, favored: false },
      craft: { value: 3, favored: false },
      dodge: { value: 3, favored: false },
      integrity: { value: 3, favored: false },
      investigation: { value: 3, favored: false },
      larceny: { value: 3, favored: false },
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

  // Thar be dragons here! Abandon hope all ye who enter here.
  getStageClasses = (index) => {
    const classes = ['New-stage card'];

    if (this.state.currentStage === index) { classes.push('show'); }
    else if (this.state.currentStage > index) { classes.push('previous'); }
    else { classes.push('next'); }

    return classes;
  }

  handleAbilityChange = ({ abilities, abilityName }) => {
    const ability = abilities[abilityName];

    this.setState({ abilities });

    const bonusAbilityPoints = this.state.bonusPoints.filter(bonus =>
      bonus.type === 'ability' &&
      bonus.target === abilityName &&
      bonus.source === 'above3');
    const spendsNeeded = Math.max(ability.value - 3, 0);
    const pointCost = ability.favored ? 1 : 2;

    const previousValue = this.state.abilities[abilityName].value;
    const newValue = abilities[abilityName].value;
    const pointsRemoved = previousValue - newValue;

    debug(`spendsNeeded: ${spendsNeeded} | bonusAbilityPoints.length: ${bonusAbilityPoints.length}`);

    if (pointsRemoved > 0 && previousValue > 3) {
      // While this isn't wrong, it feels hacky. I should only remove points above 3. So if it was
      // 5, then I either remove 1 (if only 1 point was removed), or 2 if more were removed.
      // If it was 4, I'm only removing 1 point.
      this.removeBonusAbility(abilityName, previousValue === 5 ? Math.min(pointsRemoved, 2) : 1, 'above3');
    } else if (spendsNeeded > bonusAbilityPoints.length) {
      // Don't have as many bonus points as we need.
      this.addBonusAbility(abilityName, spendsNeeded - bonusAbilityPoints.length, pointCost, 'above3');
    }

    if (abilities[abilityName].favored !== this.state.abilities[abilityName].favored) {
      // You changed the favored...
      // I'm not sure how to elegantly handle this other than nuke the equalize bonus points
      // and re-equalize (which looks for favored) to keep it optimized and not screw you.
      const { bonusPoints } = this.state;

      let modifiedAbilityPoints = bonusPoints.filter(spend => spend.source !== 'equalize');

      if (bonusAbilityPoints.length && (bonusAbilityPoints[0].amount !== pointCost)) {
        modifiedAbilityPoints = modifiedAbilityPoints
          .filter(spend => !(spend.type === 'ability' && spend.target === abilityName && spend.source === 'above3'))
          .concat(Array(bonusAbilityPoints.length).fill({
            ...bonusAbilityPoints[0],
            amount: pointCost
          }));
      }

      this.setState({ bonusPoints: modifiedAbilityPoints }, () => {
        this.checkForEqualize();
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.abilities !== this.state.abilities) {
      this.checkForEqualize();
    }
  }

  checkForEqualize = () => {
    const abilityTotal = Object.values(this.state.abilities).reduce((sum, ability) => sum + Math.min(3, ability.value), 0);
    const equalizePoints = this.state.bonusPoints.filter(spend => spend.type === 'ability' && spend.source === 'equalize').length;

    if (abilityTotal > 28 && (abilityTotal - equalizePoints) > 28) {
      debug('Need to equalize abilities');
      this.equalizeAbilitiesAdd(abilityTotal, equalizePoints);
    } else if (equalizePoints && (abilityTotal - equalizePoints) < 28) {
      debug('Too many equalize bonus points');
      this.equalizeAbilitiesRemove(abilityTotal, equalizePoints);
    }
  }

  equalizeAbilitiesAdd = (abilityTotal, handled) => {
    const { abilities } = this.state;
    const diff = abilityTotal - handled - 28;
    let remaining = diff;

    const favoredSpends = Object.keys(abilities).filter(ability => abilities[ability].favored).reduce((spends, ability) => {
      if (!remaining || !abilities[ability].value) { return spends; }

      const count = Math.min(remaining, Math.min(abilities[ability].value, 3));
      remaining -= count;
      return spends.concat(Array(count).fill({
        type: 'ability',
        target: ability,
        amount: abilities[ability].favored ? 1 : 2,
        source: 'equalize'
      }));
    }, []);


    const newSpends = Object.keys(abilities).filter(ability => !abilities[ability].favored).reduce((spends, ability) => {
      if (!remaining || !abilities[ability].value) { return spends; }

      const count = Math.min(remaining, Math.min(abilities[ability].value, 3));
      remaining -= count;
      return spends.concat(Array(count).fill({
        type: 'ability',
        target: ability,
        amount: abilities[ability].favored ? 1 : 2,
        source: 'equalize'
      }));
    }, favoredSpends);

    this.setState({
      bonusPoints: this.state.bonusPoints.concat(newSpends)
    });
  }

  equalizeAbilitiesRemove = (abilityTotal, handled) => {
    const { bonusPoints } = this.state;

    const excess = 28 - (abilityTotal - handled);
    const remaining = bonusPoints.filter(spend => spend.type === 'ability' && spend.source === 'equalize').slice(excess);
    const newSpends = bonusPoints.filter(spend => spend.type !== 'ability' || spend.source !== 'equalize').concat(remaining);

    this.setState({ bonusPoints: newSpends });
  }

  addBonusAbility = (name, count, amount, source) => {
    this.setState({ bonusPoints: this.state.bonusPoints.concat(Array(count).fill({ type: 'ability', target: name, amount, source })) });
  }

  removeBonusAbility = (name, count, source) => {
    const { bonusPoints } = this.state;

    const remaining = bonusPoints.filter(spend => spend.type === 'ability' && spend.target === name && spend.source === source).slice(count);
    const newSpends = bonusPoints.filter(spend => spend.type !== 'ability' || spend.target !== name || spend.source !== source).concat(remaining);

    this.setState({ bonusPoints: newSpends });
  }

  changeBonusPointAbilityCost = (name, amount, source) => {
    this.changeBonusPointCost(spend => spend.type === 'ability' && spend.target === name && spend.source === source, amount);
  }

  changeBonusPointCost = (selector, amount) => {
    this.setState({ bonusPoints: this.state.bonusPoints.map(spend => selector(spend) ? { ...spend, amount } : spend) });
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
            onChange={this.handleAbilityChange}
            onCasteChange={value => this.setState({ general: { ...general, caste: value }})}
            onSupernalChange={value => this.setState({ supernalAbility: value })}
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
              <div>
                <span>Bonus Points:</span>
                <span>{this.state.bonusPoints.reduce((sum, spend) => sum + spend.amount, 0)}</span>
                <span>/15</span>
              </div>
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
