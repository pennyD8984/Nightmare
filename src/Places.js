import React, { Component } from 'react';
import { markerStyle, markerStyleHover } from './style.js'
export default class Places extends Component {
  
  constructor(props){
    super(props);
  }
  componentDidMount(){

  }

  render() {
  const style = this.props.$hover ? markerStyleHover : markerStyle;

  return (
      <div 
        style={style}
      >{this.props.name}
      </div>
    );
  }
}