import React, { Component } from 'react';
import { markerStyle, markerStyleHover } from './style.js'
import pin2 from './pin2.svg';

const bouncyBouncyBoBoBon ={
    background: `url(${pin2})`,   
	width: 60,
	height: 60
}

export default class Markers extends Component {

  render(){
	if(this.props.currentVenue.name === this.props.name){
		return(
			<div style={bouncyBouncyBoBoBon} tabIndex='0' className='bounce'></div>
		)
	}

  const style = this.props.$hover ? markerStyleHover : markerStyle;
  return (
  	// bounce when first displayed
    <div style={style} tabIndex='0'></div>
    );
  }
}