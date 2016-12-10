import React, { Component } from 'react';
import Container from './Container';

export default class RestaurantHost extends Component {
  render() {
    return (
      <div>
        <p>
          <b><a href='https://github.com/gaearon/react-dnd/tree/master/examples/01%20Dustbin/Multiple%20Targets'>Browse the Source</a></b>
        </p>
        <p>
          Custom example for Tyler's presentation
        </p>
        <p>
          It shows off an async drop process.
        </p>
        <Container />
      </div>
    );
  }
}