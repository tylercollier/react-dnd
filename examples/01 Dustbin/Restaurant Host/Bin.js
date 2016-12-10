import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import Guest from './Guest';

const style = {
  width: '400px',
  border: '1px silver solid',
  margin: '1rem',
  borderRadius: '5px',
};

const hideStyle = { height: 0, overflow: 'hidden' };

const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  },
  canDrop(props, monitor) {
    const guest = monitor.getItem();
    return guest.binName !== props.bin.name;
  }
};

@DropTarget('GUEST', dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
export default class Bin extends Component {
  static propTypes = {
    bin: PropTypes.object.isRequired,
    guests: PropTypes.array.isRequired,

    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    onDrop: PropTypes.func.isRequired
  };

  render() {
    const { isOver, canDrop, connectDropTarget, bin, guests } = this.props;
    const isActive = isOver && canDrop;

    let backgroundColor = 'lightblue';
    if (isActive) {
      backgroundColor = 'hsl(195, 53%, 65%)';
    } else if (canDrop) {
      backgroundColor = 'white';
    }

    return connectDropTarget(
      <div className="bin" style={{ ...style, backgroundColor }}>
        <div className="header">{bin.name}</div>
        <div className="guests" style={canDrop ? hideStyle : {}}>
          {guests.map(g => <Guest key={g.name} guest={g} />)}
        </div>
        <div className="canDropOverlay" style={canDrop ? {} : hideStyle}>
          +
        </div>
      </div>
    );
  }
}