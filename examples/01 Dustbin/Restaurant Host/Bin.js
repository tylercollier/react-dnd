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
    props.onDrop(monitor.getItem(), props.bin);
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
    isHandlingDropAction: PropTypes.bool,

    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    onDrop: PropTypes.func.isRequired
  };

  render() {
    const { isOver, canDrop, connectDropTarget, bin, guests, isHandlingDropAction } = this.props;
    const isActive = isHandlingDropAction || isOver && canDrop;

    let backgroundColor = 'lightblue';
    if (isActive) {
      backgroundColor = 'hsl(195, 53%, 65%)';
    } else if (canDrop) {
      backgroundColor = 'white';
    }
    const classNames = 'canDropOverlay' + (isHandlingDropAction ? ' spin' : '');

    return connectDropTarget(
      <div className="bin" style={{ ...style, backgroundColor }}>
        <div className="header">{bin.name}</div>
        <div className="guests" style={isHandlingDropAction || canDrop ? hideStyle : {}}>
          {guests.map(g => <Guest key={g.name} guest={g} />)}
        </div>
        <div className={classNames} style={isHandlingDropAction || canDrop ? {} : hideStyle}>
          +
        </div>
      </div>
    );
  }
}