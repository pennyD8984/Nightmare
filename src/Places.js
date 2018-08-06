import React, { Component } from 'react';
import { markerStyle, markerStyleHover } from './style.js'

export default class Places extends Component {
	constructor(){
	  super();
	  this.state = {
	  	active: false
	  }
	}

  render() {
  const style = this.props.$hover ? markerStyleHover : markerStyle;
  return (
      <div style={style} className={'bounce'} tabIndex='0'>
      </div>
    );
  }
}