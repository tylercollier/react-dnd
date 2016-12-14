// This file will shown during the presentation for explanatory purposes.





/* eslint-disable */
import React, { Component } from 'react';
import Guest from '../examples/01 Dustbin/Restaurant Host/Guest';

export class Bin extends Component {
  render() {
    const { bin, guests } = this.props;

    return (
      <div>
        <div className="header">{bin.name}</div>
        {guests.map(g => <Guest key={g.id} guest={g} />)}
      </div>
    );
  }
}












































































export class DroppableBin extends Component {
  render() {
    const { bin, guests, canDrop } = this.props;

    let backgroundColor = 'lightblue';
    if (canDrop) {
      backgroundColor = 'white';
    } else {
      backgroundColor = 'darkblue';
    }

    return (
      <div style={{ backgroundColor }}>
        <div className="header">{bin.name}</div>
        {guests.map(g => <Guest key={g.id} guest={g} />)}
      </div>
    );
  }
}





















































































class DroppableBin extends Component {
  render() {
    const { bin, guests, canDrop } = this.props;

    let backgroundColor = 'lightblue';
    if (canDrop) {
      backgroundColor = 'white';
    } else {
      backgroundColor = 'darkblue';
    }

    return connectDropTarget(
      <div style={{ backgroundColor }}>
        <div className="header">{bin.name}</div>
        {guests.map(g => <Guest key={g.id} guest={g} />)}
      </div>
    );
  }
}

const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem(), props.bin);
  },
  canDrop(props, monitor) {
    const guest = monitor.getItem();
    return guest.binId !== props.bin.id;
  }
};

export default DropTarget('GUEST', dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop()
}))(DroppableBin)







/* eslint-enable */