import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'
import ErrorBoundary from './ErrorBoundary.js';

export default class App extends Component {
	constructor(){
	  super();
	  this.state = {
	    query : 'sushi',
		center: {lat: 49.240157, lng: 6.996933},
	    venues: {},
	    infowindowOpen: false,
	   	currentVenue: {},
	  }
	}

	updateQuery = (query) => {
    	this.setState({query: query});
  	}

	updateVenues = (venues) => {
		return(
	    	this.setState({
	    		venues: venues,
	    	})
		)
  	}

  	handleClick = (venue) =>{
  	// when user clicks on a list item, center gets reset
		this.setState({
			center: {lat: venue.location.lat, lng: venue.location.lng},
			currentVenue: venue,
			infowindowOpen: true
		})
  	}

	render() {
	let locList;
	if (this.state.venues.length){
		locList = this.state.venues.map((venue) => {
			return(			
				<li key={venue.id}						
					tabIndex='0'
					name={venue.name}
					lat={venue.location.lat}
					lng={venue.location.lng}
					address={venue.location.formattedAddress}
					// for reference: pass 2 parameters to evt listener
					// onClick={(e)=>this.handleClick(venue, e)}
					onClick={()=>{this.handleClick(venue)}}
					onKeyPress={()=>{this.handleClick(venue)}}
					>
					<a
					>{venue.name}</a>
				</li>
			)
		})
	 }

	    return (
	      	<ErrorBoundary>
				<main 
			      	id="app" 
			      	style={{ height: '100vh', width: '100vw', maxHeight: '100vh'}}>
		          	<aside id="aside">
			          	<label htmlFor='search' id='searchLabel'>Search</label>
			            <input
			              id='searchInput' 
			              type='text'
			              placeholder="Search.." 
			              name="search"
			              value={this.state.query}
			              onChange={(event) => this.updateQuery(event.target.value)}
			            >
			          	</input>
			          	<ul id='locationList' role="navigation">
			          		{locList}
			          	</ul>
		      		</aside>          	
		      	<Map 
		      		query={this.state.query}
		      		center={this.state.center}
		      		updateVenues={this.updateVenues}
		      		currentVenue={this.state.currentVenue}
		      	/>
		      </main>
	      </ErrorBoundary>
	    );
	}
}
