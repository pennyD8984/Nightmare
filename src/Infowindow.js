import React, { Component } from 'react';
import './App.css';

export default class Infowindow extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.onClick();
  }

  render() {
  return (
      <div id='infowindow'>
        <ul>
          <li id='name'>{this.props.clickedName}</li>
          <li id='address'>{this.props.clickedAddress}</li>
        </ul>
        <button 
          role="button" id='close' 
          aria-label="Close Infowindow"
          onClick={this.handleClick}
        >&times;
        </button>
      </div>
    );
  }
}