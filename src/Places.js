import React, { Component } from 'react';
import { markerStyle, markerStyleHover } from './style.js'

export default class Markers extends Component {

  render() {
  	{  	console.log(this.props.currentVenue)
}
  const style = this.props.$hover ? markerStyleHover : markerStyle;
  return (
  	// bounce when 	first displayed
    <div style={style} tabIndex='0'></div>
    );
  }
}