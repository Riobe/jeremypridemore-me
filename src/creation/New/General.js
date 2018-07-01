import React from 'react';

import { CASTE } from '../../constants';

const debug = require('debug')('jeremypridemore-me:creation:New:General');

export default function General({ general, onChange }) {
  return (
    <div className="row mb-2">
      <form className="col-12 col-md">

        <div className="form-row">

          <div className="col-12 col-md p-2">
            <div className="row align-items-end">
              <label className="col-12 col-md-auto" htmlFor="name">Character:</label>
              <input
                id="name"
                className="form-control col"
                type="text"
                value={general.name}
                onChange={e => onChange && onChange({
                  ...general,
                  name: e.target.value
                })}
              />
            </div>
          </div>

          <div className="d-none d-md-block col-1"></div>

          <div className="col-12 col-md p-2">
            <div className="row align-items-end">
              <label className="col-12 col-md-auto" htmlFor="player">Player:</label>
              <input
                id="player"
                className="form-control col"
                type="text"
                value={general.player}
                onChange={e => onChange && onChange({
                  ...general,
                  player: e.target.value
                })}
              />
            </div>
          </div>

          <div className="d-none d-md-block col-1"></div>

          <div className="col-12 col-md p-2">
            <select
              id="caste"
              className="form-control"
              value={general.caste}
              onChange={e => {
                debug(`caste changed to: ${e.target.value}`);
                onChange && onChange({
                  ...general,
                  caste: e.target.value
                })
              }}
            >
              <option value="">Choose caste...</option>
              {Object.values(CASTE).map(caste => (
                <option key={caste} value={caste}>{caste}</option>
              ))}
            </select>
          </div>

        </div>

        <div className="form-row">

          <div className="col-12 col-md p-2">
            <div className="row align-items-end">
              <label className="col-auto" htmlFor="anima">Anima:</label>
              <input
                id="anima"
                className="form-control col"
                type="text"
                value={general.anima}
                onChange={e => onChange && onChange({
                  ...general,
                  anima: e.target.value
                })}
              />
            </div>
          </div>

          <div className="d-none d-md-block col-1"></div>

          <div className="col-12 col-md p-2">
            <div className="row align-items-end">
              <label className="col-auto" htmlFor="concept">Concept:</label>
              <input
                id="concept"
                className="form-control col"
                type="text"
                value={general.concept}
                onChange={e => onChange && onChange({
                  ...general,
                  concept: e.target.value
                })}
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <label className="col-auto" htmlFor="player">Description</label>
          <textarea
            id="description"
            className="form-control"
            rows="4"
            value={general.description}
            onChange={e => onChange && onChange({
              ...general,
              description: e.target.value
            })}
          ></textarea>
        </div>
      </form>
    </div>
  );
}
