import React, { Component, ReactDOM } from 'react';
import './App.css';
import Map from './Map.js'
import 'font-awesome/css/font-awesome.min.css';

export default class App extends Component {
	constructor(){
	  super();
	  this.state= {
	    query : ''
	  }
	}

  updateQuery = (query) => {
    this.setState({query: query})
  }

	render() {
	    return (
	      	<div 
		      	id="app" 
		      	style={{ height: '100vh', width: '100vw'}}	
	      	>
	          <aside>
	            <input 
	              id='searchInput' 
	              type='text'
	              placeholder="Search.." 
	              name="search"
	              value={this.state.query}
	              onChange={(event) => this.updateQuery(event.target.value)}
	              >
	          	</input>
	          	<button 
	            id='searchBtn' 
	            type="submit">
	              <i className="fa fa-search"></i>
	          	</button>
	      	</aside>          	
	      	<Map/>
	      </div>
	    );
	  }
	}
