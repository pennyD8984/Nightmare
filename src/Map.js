import React, { Component } from 'react';
import axios from 'axios'
import GoogleMapReact from 'google-map-react';
import Places from './Places.js';
import { mapStyle } from './style.js';
import Infowindow from './Infowindow.js';

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
    mapTypeControl: true,
    Animation: 1,
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
			infowindowOpen: props.infowindowOpen
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
			infowindowOpen: false
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
		client_id: 'CFVKHDX0LHALJFVOSFQRMDYZFDADC3ZKLHZF2XBDZ4E02KAT',
		client_secret: 'NCTNCFDK4OLL1FUFZWOOZ12PNNCEZ0D44EZNN5BZQUQ3J4NF',
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
	.catch((response) => {
		console.log('error retreiving data: ' + response);
	})
}
	// Callback to change state when infowindow close button is clicked
	closeIw = () => {
		if(this.state.infowindowOpen){
			this.setState({infowindowOpen: false}, () => {
				this.state.infowindowOpen
			})
		}
	}

	render() {
	let markers;
	let iw;
	if (this.state.venues !== null && this.state.venues !== undefined){
		markers = this.state.venues.map(function(venue) {
			return(			
				<Places 
					key={venue.id}
					lat={venue.location.lat}
					lng={venue.location.lng}
					name={venue.name}
					address={venue.location.formattedAddress}
				>
				</Places>
			)
		})
	}

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
    );
  }
}
