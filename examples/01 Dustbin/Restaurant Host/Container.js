import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Bin from './Bin';
import update from 'react/lib/update';
import groupBy from 'lodash/groupBy';
import './style.less';

const style = {
  display: 'flex',
  height: '500px',
};

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bins: [
        { name: 'Waiting' },
        { name: 'Serving' },
        { name: 'Survey' },
      ],
      guests: [
        { name: 'Joe', phoneNumber: '123-456-7890', binName: 'Waiting' },
        { name: 'Hilary', phoneNumber: '123-456-7890', binName: 'Waiting' },
        { name: 'Ishmael', phoneNumber: '123-456-7890', binName: 'Serving' },
        { name: 'Trent', phoneNumber: '123-456-7890', binName: 'Survey' },
      ],
      droppedBoxNames: []
    };
  }

  componentWillMount() {

  }

  isDropped(boxName) {
    return this.state.droppedBoxNames.indexOf(boxName) > -1;
  }

  render() {
    const { bins, guests } = this.state;
    const guestsByBin = groupBy(guests, g => g.binName);

    return (
      <div style={style}>
        {bins.map(bin => (
          <Bin
            key={bin.name}
            bin={bin}
            guests={guestsByBin[bin.name]}
            onDrop={this.handleDrop}
          />
        ))}
      </div>
    );
  }

  handleDrop(index, item) {
    const { name } = item;

    this.setState(update(this.state, {
      dustbins: {
        [index]: {
          lastDroppedItem: {
            $set: item
          }
        }
      },
      droppedBoxNames: name ? {
        $push: [name]
      } : {}
    }));
  }
}