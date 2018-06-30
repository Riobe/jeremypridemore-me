import React from 'react';

import './CanRead.css';

import DotSet5 from '../DotSet5';

export default function CanRead({ linguistics, onChange }) {
  return (
    <div id="CanRead">
      <p className="mt-3">
        <span>Your character</span>
        <span
          className={'CanRead-toggle' + (linguistics > 0 ? ' active' : '')}
          onClick={() => {
            if (linguistics > 1 || !onChange) { return; }
            onChange(1);
        }}> can</span>
        <span
          className={'CanRead-toggle' + (linguistics === 0 ? ' active' : '')}
          onClick={() => {
            if (linguistics === 0 || !onChange) { return; }
            onChange(0);
        }}> can't</span>
        <span> read.</span>
      </p>
      <span>Linguistics</span>
      <DotSet5
        value={linguistics}
        clearable={true}
        onValueChanged={value => {
          onChange(value);
        }}
      />
    </div>
  );
}
