import React, { Component } from 'react';
  let style = {
    width: '20vw',
    height: '25vh',
    backgroundColor: 'white',
    WebkitBoxShadow: '0px -1px 12px 3px rgba(0,0,0,0.45)',
    MozBoxShadow: '0px -1px 12px 3px rgba(0,0,0,0.45)',
    boxShadow:' 0px -1px 12px 3px rgba(0,0,0,0.45)',
    marginLeft: '-80px',
    marginTop: '-100px',
  }

export default class Infowindow extends Component {
  
  constructor(props){
    super(props);

  }

  render() {
  return (
      <div 
        style={style}
      ><ul>
        <li></li>
      </ul>
      </div>
    );
  }
}