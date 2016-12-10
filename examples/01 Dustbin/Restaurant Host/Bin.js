import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import Guest from './Guest';

const style = {
  width: '400px',
  border: '1px silver solid',
  margin: '1rem',
  borderRadius: '5px',
};

const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  }
};

@DropTarget('GUEST', dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
export default class Dustbin extends Component {
  static propTypes = {
    bin: PropTypes.object.isRequired,
    guests: PropTypes.array.isRequired,

    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    lastDroppedItem: PropTypes.object,
    onDrop: PropTypes.func.isRequired
  };

  render() {
    const { isOver, canDrop, connectDropTarget, bin, guests } = this.props;
    const isActive = isOver && canDrop;

    let backgroundColor = 'lightblue';
    if (isActive) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }

    return connectDropTarget(
      <div className="bin" style={{ ...style, backgroundColor }}>
        <div className="header">{bin.name}</div>
        {guests.map(g => <Guest key={g.name} guest={g} />)}
      </div>
    );
  }
}