import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'

export default class App extends Component {
	constructor(){
	  super();
	  this.state = {
	    query : 'sushi',
		center: {lat: 49.240157, lng: 6.996933},
	    venues: {},
	    infowindowOpen: false,
	   	currentVenue: {}
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
			currentVenue: venue
		})
  	}


	render() {
	let locList;

	if (this.state.venues.length){
		locList = this.state.venues.map((venue) => {
			return(			
				<a key={venue.id}						
					tabIndex='0'
					name={venue.name}
					lat={venue.location.lat}
					lng={venue.location.lng}
					address={venue.location.formattedAddress}
					onClick={()=>{this.handleClick(venue)}}
					onKeyPress={()=>{this.handleClick(venue)}}
					tyle={this.state.btnColor}
					>
					<li 
					>{venue.name}</li>
				</a>
			)
		})
	 }

	    return (
	      	<div 
		      	id="app" 
		      	style={{ height: '100vh', width: '100vw'}}>
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
	          	<ul id='locationList' role="navigation">
	          		{locList}

	          	</ul>
	      	</aside>          	
	      	<Map 
	      		query={this.state.query}
	      		center={this.state.center}
	      		updateVenues={this.updateVenues}
	      		currentVenue={this.state.currentVenue}
	      		onClickList={this.handleClick}
	      	/>
	      </div>
	    );
	}
}
