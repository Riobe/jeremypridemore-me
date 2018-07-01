import React from 'react';

import './CanRead.css';

import DotSet5 from '../DotSet5';

const debug = require('debug')('jeremypridemore-me:creation:New:Abilities');

export default function CanRead({ linguistics, onChange }) {
  return (
    <div id="CanRead">
      <p className="mt-3">
        <span>Your character</span>
        <a
          id="CanRead-can"
          role="button"
          className={'mx-2 btn btn-sm ' + (linguistics > 0 ? 'btn-primary text-light' : 'btn-outline-primary')}
          onClick={() => {
            if (linguistics > 1 || !onChange) { return; }
            debug('This character can now read!');
            onChange(1);
        }}> can</a>
        <a
          id="CanRead-cant"
          role="button"
          className={'mx-2 btn btn-sm ' + (linguistics === 0 ? 'btn-primary text-light' : 'btn-outline-primary')}
          onClick={() => {
            if (linguistics === 0 || !onChange) { return; }
            debug('This character can no longer read...');
            onChange(0);
        }}> can't</a>
        <span> read.</span>
      </p>
      <span>Linguistics</span>
      <DotSet5
        value={linguistics}
        clearable={true}
        onValueChanged={value => {
          debug(`Linguistics set directly to ${value}`);
          onChange(value);
        }}
      />
    </div>
  );
}
/*
        <span
          className={'CanRead-toggle' + (linguistics > 0 ? ' active' : '')}
          onClick={() => {
            if (linguistics > 1 || !onChange) { return; }
            debug('This character can now read!');
            onChange(1);
        }}> can</span>
*/
