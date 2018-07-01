import React, { Fragment } from 'react';

import './Abilities.css';

import { CASTE } from '../../constants';
import DotSet5 from '../DotSet5';

const debug = require('debug')('jeremypridemore-me:creation:New:Abilities');

const favoredAbilities = {
  dawn: ['archery', 'awareness', 'brawl', 'martialArts', 'dodge', 'melee', 'resistance', 'thrown', 'war'],
  zenith: ['athletics', 'integrity', 'performance', 'lore', 'presence', 'resistance', 'survival', 'war'],
  twilight: ['bureaucracy', 'craft', 'integrity', 'investigation', 'linguistics', 'lore', 'medicine', 'occult'],
  night: ['athletics', 'awareness', 'dodge', 'investigation', 'larceny', 'ride', 'stealth', 'socialize'],
  eclipse: ['bureaucracy', 'larceny', 'linguistics', 'occult', 'presence', 'ride', 'sail', 'socialize']
};

const isCaste = (ability, caste) => {
  if (!caste) { return false; }

  const favored = favoredAbilities[caste];

  if (!favored) { return false; }

  return favored.includes(ability);
};

const getCasteFavoredAbilities = (caste, abilities) => {
  if (!caste) { return; }

  const casteFavored = favoredAbilities[caste].filter(ability => abilities[ability].favored);

  return casteFavored;
};

export default function Abilities({ abilities, supernal, caste, onChange, onCasteChange, onSupernalChange, onBonusPoints }) {
  const abilityNames = Object.keys(abilities);
  const casteFavored = getCasteFavoredAbilities(caste, abilities);

  const changeFavored = (ability, e) => {
    debug(`e.isPropagationStopped() === ${e.isPropagationStopped()}`);
    e.stopPropagation();
    if (!onChange) { return; }
    const value = !abilities[ability].favored;

    debug(`${ability} is ${value ? 'favored' : 'unfavored'}`);

    const newState = {
      ...abilities,
      [ability]: {
        ...abilities[ability],
        favored: value
      }
    };

    onChange(newState);
  };

  const abilityRow = ability => (
    <div className={'ability row col justify-content-between mb-2' + (isCaste(ability, caste) ? ' caste' : '')} key={ability}>
      <div
        className="ability-header col text-capitalize"
        onClick={e => {
          e.stopPropagation();
          debug('div changing favored ability');
          changeFavored(ability, e);
        }}
      >
        <input
          id={'ability-favored-' + ability}
          className="form-check-input"
          type="checkbox"
          checked={abilities[ability].favored}
          onChange={e => {
            e.stopPropagation();
            debug('input changing favored ability');
            changeFavored(ability, e);
          }}
        />
        <label className="form-check-label" htmlFor={'ability-favored-' + ability}>{ability.replace(/[A-Z]/g, ' $&')}</label>
      </div>
      <DotSet5
        className="ability-value col-auto"
        value={abilities[ability].value}
        onValueChanged={value => {
          if (!onChange) { return; }
          debug(`${ability} set to ${value}`);
          const newState = {
            ...abilities,
            [ability]: {
              ...abilities[ability],
              value
            }
          };

          onChange(newState);
        }}
        clearable={true}
      />
    </div>
  );

  return (
    <div id="Abilities" className="row my-5 mb-0 shadow-lg">
      <div className="col-12">

        <div className="row">
          <div className="col-12 col-md-3">
            <select
              id="caste"
              className="form-control text-capitalize"
              value={caste}
              onChange={e => {
                const newCaste = e.target.value;
                debug(`caste changed to: ${newCaste}`);
                onCasteChange && onCasteChange(newCaste)
                if (supernal && newCaste && onSupernalChange && !isCaste(supernal, newCaste)) {
                  debug(`Clearing supernal because ${newCaste} is not a ${newCaste} ability`);
                  onSupernalChange('');
                }
              }}
            >
              <option value="">No Caste</option>

              {Object.values(CASTE).map(caste => (
                <option key={caste} value={caste}>{caste}</option>
              ))}

            </select>
          </div>

        </div>
      </div>

      <div className="col-12">
        <div className="row mt-3">
          <div className="Abilities-square caste ml-3"></div>
          <div className="col-auto">Caste Row</div>
          <div className="col">Check a row to favor it.</div>
        </div>
      </div>

      <div className="col-12 mt-3">
        <div className="row">
          <span className="col-12 col-md-6">Your supernal ability is special. It must be picked from one of your favored caste abilities, and when you're getting charms for it, you can ignore the essence requirement! This lets you get very strong charms for this ability even during character creation.</span>
        </div>
      </div>

      <div className="col-12">
        <div className="row align-items-end">
          <label className="col-12 col-md-auto" htmlFor="supernal">Supernal:</label>
          <select
            id="supernal"
            className="form-control col col-md-4 text-capitalize"
            value={supernal}
            onChange={e => {
              debug(`caste changed to: ${e.target.value}`);
              onSupernalChange && onSupernalChange(e.target.value)
            }}
          >
            {(casteFavored && !casteFavored.length) ? (
              <option hidden disabled value="">Favor a caste ability...</option>
            ) : (
              <option hidden disabled value="">Choose an ability...</option>
            )}
            {(casteFavored || abilityNames).map(ability => (
              <option className="text-capitalize" key={ability} value={ability}>{ability.replace(/[A-Z]/g, ' $&')}</option>
            ))}

          </select>
        </div>
      </div>

      <div className="Abilities-current-favored col-12">
        <span className="mr-3 d-inline-block align-middle">Favored abilities:</span>
        <span className="mr-3 d-inline-block align-middle">{abilityNames.filter(ability => abilities[ability].favored).length}/10</span>
        {caste && (
          <Fragment>
            <span className="mr-3 d-inline-block align-middle">Caste abilities:</span>
            <span className="mr-3 d-inline-block align-middle">
              {Math.min(5, abilityNames.filter(ability => abilities[ability].favored && isCaste(ability, caste)).length)}/5
            </span>
          </Fragment>
        )}
      </div>

      <div className="col-12 col-md-4 p-md-2">
        {abilityNames.slice(0, abilityNames.length / 2).map(ability => abilityRow(ability))}
      </div>

      <div className="col-12 col-md-4 p-md-2">
        {abilityNames.slice((abilityNames.length / 2), abilityNames.length).map(ability => abilityRow(ability))}
      </div>
    </div>
  );
}
