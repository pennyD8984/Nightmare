import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'

export default class App extends Component {
	constructor(){
	  super();
	  this.state= {
	    query : 'sushi',
		center: {lat: 49.240157, lng: 6.996933},
	    venues: {},
	    clickedMarker: [],
	  }
	    this.updateVenues = this.updateVenues.bind(this);
    	this.getClickedMarker = this.getClickedMarker.bind(this);
    	this.onClickList = this.onClickList.bind(this)
	}

	updateQuery = (query) => {
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

  	onClickList(event){
	  	console.log(event.target.getAttribute('name'));
  	}

	render() {
	let locList;
	if (this.state.venues.length){
		locList = this.state.venues.map((venue) => {
			return(			
				<a key={venue.id}>
					<li					
						tabIndex='0'
						name={venue.name}
						lat={venue.location.lat}
						lng={venue.location.lng}
						address={venue.location.formattedAddress}
						onClick={(event)=>{this.onClickList(event)}}
					>{venue.name}
					</li>
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
			    getClickedMarker={this.getClickedMarker}
	      	/>
	      </div>
	    );
	}
}
