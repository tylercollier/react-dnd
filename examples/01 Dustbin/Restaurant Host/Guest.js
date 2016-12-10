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
    return props.guest;
  }
};

@DragSource('GUEST', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Guest extends Component {
  static propTypes = {
    guest: PropTypes.object.isRequired,

    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  };

  render() {
    const { isDragging, connectDragSource, guest } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(
      <div style={{ ...style, opacity }}>
        Name: {guest.name}<br/>
        Phone number: {guest.phoneNumber}
      </div>
    );
  }
}