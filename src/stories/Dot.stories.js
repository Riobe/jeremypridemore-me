import React, { Component } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Dot from '../creation/Dot';

export default function storiesOfDot(module) {
  storiesOf('Dot', module)
    .add('not filled in', () => <Dot />)
    .add('filled in', () => <Dot filled={true} />)
    .add('handles clicks', () => {
      const WithClickHandler = class extends Component {
        state = {
          filled: false
        }

        render() {
          return (
            <Dot filled={this.state.filled} onClick={e => {
              action('clicked')(e);
              this.setState({ filled: !this.state.filled });
            }} />
          );
        }
      };

      return <WithClickHandler />;
    });
}
