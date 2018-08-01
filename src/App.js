import React, { Component, ReactDOM } from 'react';
import './App.css';
import Map from './Map.js'

export default class App extends Component {
	render() {
	    return (
	      <div id="app" style={{ height: '100vh', width: '100vw', float: 'right' }}>
	      	<Map />
	      </div>
	    );
	  }
	}
