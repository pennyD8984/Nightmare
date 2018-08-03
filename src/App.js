import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'

export default class App extends Component {
	constructor(){
	  super();
	  this.state= {
	    query : '',
	    venues: [],
	  }
	}

	updateQuery(query) {
    	this.setState({query: query});
  	}

	render() {
	    return (
	      	<div 
		      	id="app" 
		      	style={{ height: '100vh', width: '100vw'}}	
	      	>
	          <aside id="aside">
	            <input
	              id='searchInput' 
	              type='text'
	              placeholder="Search.." 
	              name="search"
	              value={this.state.query}
	              onChange={(event) => this.updateQuery(event.target.value)}
	              >
	          	</input>
	          	<ul id='locationList'>
	          		<a href='#'><li>Location</li></a>
	          		<a href='#'><li>Location</li></a>
	          		<a href='#'><li>Location</li></a>
	          		<a href='#'><li>Location</li></a>
	          		<a href='#'><li>Location</li></a>
	          	</ul>
	      	</aside>          	
	      	<Map 
	      		query={this.state.query}
	      	/>
	      </div>
	    );
	}
}
