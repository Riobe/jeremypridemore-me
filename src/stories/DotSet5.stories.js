import React, { Component } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DotSet5 from '../creation/DotSet5';

export default function storiesOfDot(module) {
  storiesOf('DotSet5', module)

    .add('can bind in a value', () => {
      const DotSet5ValueDemo = class extends Component {
        state = {
          value: 0
        }

        render() {
          return (
            <div>
              <div style={{marginBottom: '10px'}}>
              {[...Array(6).keys()].map(i =>
                <button
                  type="button"
                  style={{marginRight: '5px'}}
                  onClick={() => this.setState({ value: i })}
                >Set to {i}</button>
              )}
              </div>
              <DotSet5 value={this.state.value} />
            </div>
          );
        }
      };

      return <DotSet5ValueDemo />;
    })

    .add('throws event when value changes', () => {
      const DotSet5ClickDemo = class extends Component {
        state = {
          value: 1
        }

        render() {
          return (
            <DotSet5
              value={this.state.value}
              onValueChanged={value => {
                action('onValueChanged')(value);
                this.setState({value});
              }}
            />
          );
        }
      };

      return <DotSet5ClickDemo />
    })

    .add('can be clearable', () => {
      const DotSet5ClearableDemo = class extends Component {
        state = {
          value: 3
        }

        render() {
          return (
            <DotSet5
              value={this.state.value}
              onValueChanged={value => {
                action('onValueChanged')(value);
                this.setState({value});
              }}
              clearable={true}
            />
          );
        }
      };

      return <DotSet5ClearableDemo />
    });
}
