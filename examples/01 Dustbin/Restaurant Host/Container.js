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
      dropToBin: null,
    };
  }

  componentWillMount() {

  }

  isDropped(boxName) {
    return this.state.droppedBoxNames.indexOf(boxName) > -1;
  }

  render() {
    const { bins, guests, dropToBin } = this.state;
    const guestsByBin = groupBy(guests, g => g.binName);

    return (
      <div style={style}>
        {bins.map(bin => (
          <Bin
            key={bin.name}
            bin={bin}
            guests={guestsByBin[bin.name] || []}
            onDrop={this.handleDrop}
            isHandlingDropAction={dropToBin && dropToBin.name === bin.name}
          />
        ))}
      </div>
    );
  }

  handleDrop = (guest, bin) => {
    this.setState({ dropToBin: bin });
    this.moveGuest(guest, bin).then(() => {
      this.setState({ dropToBin: null });
    });
  }

  moveGuest = (guest, bin) => {
    const guestIndex = this.state.guests.findIndex(g => guest.name === g.name);
    return new Promise(resolve => {
      setTimeout(() => {
        this.setState(update(this.state, {
          guests: {
            [guestIndex]: {
              binName: {
                $set: bin.name
              }
            }
          },
        }), resolve);
      }, 1000);
    });
  }
}