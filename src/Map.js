import React, { Component } from 'react';
import axios from 'axios'
import GoogleMapReact from 'google-map-react';
import Places from './Places.js';
import { mapStyle } from './style.js';

  let style = {
    width: '250px',
    height: '250px',
    backgroundColor: 'yellow',}

export default class Map extends Component {

	constructor(props){
		super(props);
		this.state = {
			venues: [],
			query: '',
			center: {lat: 49.240157, lng: 6.996933},
			zoom: 16,
			click: false,
		}
		this.onChildClick = this.onChildClick.bind(this);
	} 	

componentDidMount(){
	this.fetchData('sushi'); // TODO: change when implement input field
}

onChildClick(key, props) {
	let clickedMarker = (this.state.click ? false : true);
	this.setState({
	  click: clickedMarker,
	});
	this.setState({
		center: {'lat': props.lat, 'lng': props.lng}
	});
	console.log(props.lat)
}

// TODO: error handling
fetchData = (query)=>{
	const endPoint='https:///api.foursquare.com/v2/venues/search?';
	const params={
		client_id: 'XLUDSSAPKB4ZH2T1SVZ5NNTED4Y1TS2WOUXDJC4HWQOXTUE4',
		client_secret: 'OJIYYCAARPA1CU02MRHQAF03RUFYDPCEAK1OOHO3HQPQS4LY',
		query: query,
		near: 'saarbruecken',
		intent: 'browse',
		v: 20180728,
	};

	axios.get(endPoint + new URLSearchParams(params))
	.then(response => { 
		this.setState({
		venues: response.data.response.venues
	});
	})
}
	render() {
	const venues = this.state.venues;
	let markers;
	if (venues !== null){
		markers = venues.map(function(venue) {
			return(
				<Places 
					key={venue.id}
					lat={venue.location.lat}
					lng={venue.location.lng}
					name={venue.name}
				>
				</Places>
			)
		})
	}

    return (
        <GoogleMapReact
	        options={mapStyle}
	        bootstrapURLKeys={{key: 'AIzaSyD0bg8zynVSUQBNqTIp__dBgIrVghmv8Co'}}
			center={this.state.center}
          	defaultZoom={this.state.zoom}
          	onChildClick={this.onChildClick}
		>
		{markers}
      </GoogleMapReact>
    );
  }
}

