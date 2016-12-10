import React, { PropTypes, Component } from 'react';
import { DragSource } from 'react-dnd';

const style = {
  border: '1px solid gray',
  backgroundColor: 'white',
  borderRadius: '5px',
  padding: '1rem',
  margin: '1rem',
  cursor: 'move',
};

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name
    };
  }
};

@DragSource('GUEST', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Box extends Component {
  static propTypes = {
    guest: PropTypes.object.isRequired,

    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isDropped: PropTypes.bool.isRequired
  };

  render() {
    const { name, isDropped, isDragging, connectDragSource, guest } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(
      <div style={{ ...style, opacity }}>
        Name: {guest.name}<br/>
        Phone number: {guest.phoneNumber}
      </div>
    );
  }
}