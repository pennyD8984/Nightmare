import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'

export default class App extends Component {
	constructor(){
	  super();
	  this.state= {
	    query : '',
	    venues: {},
	    showLocList: false,
	    clickedMarker: [],
		center: {lat: 49.240157, lng: 6.996933},
	  }
	}

	updateQuery(query) {
    	this.setState({query: query});
  	}

	updateVenues(venues) {
    	this.setState({
    		venues: venues,
    	});
  	}

  	getClickedMarker(marker){
  		this.setState({
  			clickedMarker: marker
  		})
  	}

	render() {
	let locList;
	if (!this.state.venues.length === ''){
		locList = this.state.venues.map(function(venue) {
			return(			
				<a 
					key={venue.id}
					name={venue.name}
					lat={venue.location.lat}
					lng={venue.location.lng}
					address={venue.location.formattedAddress}
				><li>{venue.name}</li>
				</a>
				
			)
		})
	 }
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
	          		{locList}	          		
	          	</ul>
	      	</aside>          	
	      	<Map 
	      		query={this.state.query}
	      		center={this.state.center}
	      		// Pass the function to change state to child
	      		updateVenues={this.updateVenues.bind(this)}
	      		getClickedMarker={this.getClickedMarker.bind(this)}
	      	/>
	      </div>
	    );
	}
}
