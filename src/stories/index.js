import React, { Component } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Welcome } from '@storybook/react/demo';

import storiesOfDot from './Dot.stories';
import storiesOfDotSet5 from './DotSet5.stories';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome />);

storiesOfDot(module);
storiesOfDotSet5(module);
