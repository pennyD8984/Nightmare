import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'
class App extends Component {
	render() {
	    return (
	      <div className="App" style={{ height: '100vh', width: '100vw' }}>
	      	<Map />
	      </div>
	    );
	  }
	}

export default App;
