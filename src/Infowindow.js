import React, { Component } from 'react';
import './App.css';

export default class Infowindow extends Component {

  render() {
  return (
      <div id='infowindow'>
        <ul>
          <li id='name'>{this.props.clickedName}</li>
          <li id='address'>{this.props.clickedAddress}</li>
        </ul>
      </div>
    );
  }
}