import React from 'react';

export default function BonusPoints() {
  const costs = [
    {
      target: 'Primary or secondary Attribute',
      value: '4 per dot'
    },
    {
      target: 'Tertiary Attribute',
      value: '3 per dot'
    },
    {
      target: 'Caste/Favored Ability',
      value: '1 per dot'
    },
    {
      target: 'Non-Caste/Favored Ability',
      value: '2 per dot'
    },
    {
      target: 'Specialty',
      value: '1'
    },
    {
      target: 'Merits',
      value: '1 per dot'
    },
    {
      target: 'Caste/Favored Charm',
      value: '4'
    },
    {
      target: 'Non-Caste/Favored Charm',
      value: '5'
    },
    {
      target: 'Spell (Occult Caste/Favored)',
      value: '4'
    },
    {
      target: 'Spell (Occult non-Caste/Favored)',
      value: '5'
    },
    {
      target: 'Evocation',
      value: '4'
    },
    {
      target: 'Willpower',
      value: '2 per dot'
    },
  ];

  return (
    <table className="table table-striped table-sm">
      <thead>
        <tr>
          <th></th>
          <th scope="col">Trait Cost</th>
        </tr>
      </thead>
      <tbody>
        {costs.map(cost => (
          <tr key={cost.target}>
            <td>{cost.target}</td>
            <td>{cost.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
    
  );
}
