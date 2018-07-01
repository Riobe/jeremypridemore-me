import React from 'react';
import Dot from './Dot';

import './DotSet5.css';

const clamp = (number, min, max) => Math.min(Math.max(number, min), max);

export default function DotSet5({ value, onValueChanged, clearable, className, ...props }) {
  const threshold = clamp(value || 0, 0, 5);

  return (
    <div className={'exalted-dot-set-5 p-0' + (className ? ' ' + className : '' )} {...props}>
      {clearable && (value > 0) &&
        <div className="DotSet5-clear d-print-none" onClick={() => {
          if (!value || !onValueChanged) { return; }

          onValueChanged(0);
        }}>&times;</div>
      }
      {[...Array(5).keys()].map(i =>
        <Dot
          key={i}
          filled={i < threshold}
          onClick={() => {
            if (!onValueChanged) { return; }
            const newValue = i + 1;

            if (clearable) {
              onValueChanged(value === newValue ? 0 : newValue);
            } else if (value !== newValue) {
              onValueChanged(newValue);
            }
          }}
        />
      )}
    </div>
  );
};
