import React, { Component } from 'react';
import axios from 'axios'
import GoogleMapReact from 'google-map-react';
import Markers from './Markers.js';
import { mapStyle } from './style.js';
import Infowindow from './Infowindow.js';
import ErrorBoundary from './ErrorBoundary.js'

const endPoint='https:///api.foursquare.com/v2/venues/search?';

function createMapOptions(maps) {
  return {
  	options: mapStyle,
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
      style: maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: true
   };
}

export default class Map extends Component {
	constructor(props){
		super(props);
		this.state = {
			venues: [],
			zoom: 15,
			query: '',
			currentVenue: props.currentVenue,
			clickedMarker: {
				coords: { lat: 0, lng: 0},
				clickedMarkerInfo:{name: '', address: ''},
			},
			infowindowOpen: props.infowindowOpen,
		}
	} 	

// Get the initial locations for sushi lovers
componentDidMount(){
	if (this.props.query === 'sushi'){
		this.fetchData();
	}
}

// Receive the update query from parent and fetch the data
componentWillReceiveProps(props, nextProps){
	// workaround for too many requests issue
	// TODO: find a better way to handle this
    if (props.query !== this.state.query) {
        this.fetchData(props.query);
		this.setState({
			query: props.query
		})
	}

	if(props.center !== this.state.center){
		this.newCenter();
	}

	if(props.currentVenue !== this.state.currentVenue){
		this.setState({
			currentVenue: props.currentVenue,
		})
	}
}

newCenter = () =>{
	this.setState((prevState, props)=>{
		return{
			center: props.center,
			infowindowOpen: false,
		}
	});
}

onChildClick = (key, props) => {
	this.getNewCenter(props);
}

getNewCenter = (props) =>{
	this.setState({
		center: {'lat': props.lat, 'lng': props.lng},
      	clickedMarker: {
      		clickedMarkerInfo:{name: props.name, address: props.address},
      		coords: {lat: props.lat, lng: props.lng},
      	},      		
      	infowindowOpen: true
	})		
}

	fetchData = (query)=>{
	const params={
		client_id: '4YEVIEO5HS3YOSIEAO2GMU343DX3MK0EJOYC1T1KH1EEQ05F',
		client_secret: 'IOEE1SSE4OEKMPKXXBWUVJDKTUP3YATRELMHONQXO453UIKO',
		query: this.props.query,
		near: 'saarbruecken',
		intent: 'browse',
		v: 20180728,
		radius: 20000,
	};

	axios.get(endPoint + new URLSearchParams(params))
	.then(response => { 
		this.setState({
		venues: response.data.response.venues
		})

		this.props.updateVenues(this.state.venues)
	})
	// If the fetching fails, an error is thrown in the console
	.catch((error, response) => {
		if (error.response.status === 400) {
			alert('You reached the daily quota for foursquare, please try again tomorrow')
			console.log(error.response);
		}
		else if (error.response.status === 429) {
			alert('Quota exceeded, please try again tomorrow')
			console.log(error.response);
		}		
		else{
			alert('Oops..looks like something went wrong, please try again later');
			console.log(error.response);
		}
	})
}

	// Callback to change state when infowindow close button is clicked
	closeIw = () => {
		if(this.state.infowindowOpen){
			this.setState({infowindowOpen: false}, () => {
				this.state.infowindowOpen;
			})
		}
	}

	render() {
	let markers;
	let iw;
	if (this.state.venues !== null && this.state.venues !== undefined){
		markers = this.state.venues.map((venue) => {
			return(			
				<Markers
					key={venue.id}
					lat={venue.location.lat}
					lng={venue.location.lng}
					name={venue.name}
					address={venue.location.formattedAddress}
		      		currentVenue={this.state.currentVenue}
		      		>
				</Markers>
			)}
	)}

	// check if iw is already open, if not
	// show infowindow when marker is clicked
	if (this.state.infowindowOpen){
		iw = <Infowindow 
				clickedName={this.state.clickedMarker.clickedMarkerInfo.name}
				clickedAddress={this.state.clickedMarker.clickedMarkerInfo.address}
				infowindowOpen={this.state.infowindowOpen}
				onClick={this.closeIw}
			/>	
		}
		if (this.state.currentVenue.name && this.state.currentVenue !== undefined){
			iw =<Infowindow 
				clickedName={this.state.currentVenue.name}
				clickedAddress={this.state.currentVenue.location.formattedAddress}
				infowindowOpen={this.state.infowindowOpen}
				onClick={this.closeIw}
			/>
		}

    return (
    	<ErrorBoundary>
	        <GoogleMapReact
		        options={createMapOptions}
		        bootstrapURLKeys={{key: 'AIzaSyCi48RWeKnEzLcZcGPZZLK7JLBJtP8dS44 '}}
				center={this.state.center}
	          	defaultZoom={this.state.zoom}
	          	onChildClick={this.onChildClick}
			>
			{markers}
			{iw}
	      </GoogleMapReact>
      </ErrorBoundary>
    );
  }
}
