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
        { id: 3, name: 'Waiting' },
        { id: 9, name: 'Serving' },
        { id: 7, name: 'Survey' },
      ],
      guests: [
        { id: 99, name: 'Joe', phoneNumber: '123-456-7890', binId: 3 },
        { id: 45, name: 'Hilary', phoneNumber: '123-456-7890', binId: 3 },
        { id: 20, name: 'Ishmael', phoneNumber: '123-456-7890', binId: 9 },
        { id: 34, name: 'Trent', phoneNumber: '123-456-7890', binId: 7 },
      ],
      dropToBin: null,
    };
  }

  render() {
    const { bins, guests, dropToBin } = this.state;
    const guestsByBin = groupBy(guests, g => g.binId);

    return (
      <div style={style}>
        {bins.map(bin => (
          <Bin
            key={bin.name}
            bin={bin}
            guests={guestsByBin[bin.id] || []}
            onDrop={this.handleDrop}
            isHandlingDropAction={dropToBin && dropToBin.id === bin.id}
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
    const guestIndex = this.state.guests.findIndex(g => guest.id === g.id);
    return new Promise(resolve => {
      setTimeout(() => {
        this.setState(update(this.state, {
          guests: {
            [guestIndex]: {
              binId: {
                $set: bin.id
              }
            }
          },
        }), resolve);
      }, 1000);
    });
  }
}