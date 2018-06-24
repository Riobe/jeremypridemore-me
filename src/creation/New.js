import React, { Component } from 'react';
import AttributeRow from './AttributeRow';

export default class New extends Component {
  state = {
    attributes: {
      physical: {
        strength: 3,
        dexterity: 2,
        stamina: 1
      },
      social: {
        charisma: 2,
        manipulation: 2,
        appearance: 2
      },
      mental: {
        perception: 2,
        intelligence: 2,
        wits: 2
      }
    }
  }

  handleAttributeChange = (type, attribute, value) => {
    const attributeValues = {...this.state.attributes};
    const typeValues = {...this.state.attributes[type]};
    this.setState({
      attributes: {
        ...attributeValues,
        [type]: {
          ...typeValues,
          [attribute]: value
        }
      }
    });
  }

  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col text-center">
            <h1 className="display-1">New Character</h1>
          </div>
        </div>

        <div className="row">
          <h3>Attributes</h3>
        </div>

        <div className="shadow-lg">
          {Object.keys(this.state.attributes).map(type => (
            <AttributeRow
              key={type}
              name={type}
              attributeType={this.state.attributes[type]}
              onValueChanged={({attribute, newValue}) => this.handleAttributeChange(type, attribute, newValue)}
            />
          ))}
        </div>

      </div>
    );
  }
}
