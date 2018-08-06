import React, { Component } from 'react';
import { markerStyle, markerStyleHover } from './style.js'
 
export default class Places extends Component {

  render() {
  const style = this.props.$hover ? markerStyleHover : markerStyle;

  return (
      <div style={style}
      >
      </div>
    );
  }
}