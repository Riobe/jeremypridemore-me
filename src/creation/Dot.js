import React from 'react';
import './Dot.css';

export default function Dot({ filled, onClick }) {
  return <div
    className={'exalted-dot' + (filled ? ' exalted-dot-filled' : '')}
    onClick={onClick}
  />;
}
