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
  };
}

export default class Map extends Component {
	constructor(props){
		super(props);
		this.state = {
			venues: [],
			center: this.props.center,
			zoom: 13,
			query: '',
			clickedMarker: {
				coords: { lat: 0, lng: 0},
				clickedMarkerInfo:{name: '', address: ''},
			},
			infowindowOpen: false,
		}
		this.onChildClick = this.onChildClick.bind(this);
		this.closeIw = this.closeIw.bind(this);
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
    if (this.props.query !== this.state.query) {
        this.fetchData(this.props.query);
		this.setState({
			query: props.query,
		})
	}
}

onChildClick(key, props) {
	console.log(key);
	this.setState({
		center: {'lat': props.lat, 'lng': props.lng},
      	clickedMarker: {
      		clickedMarkerInfo:{name: props.name, address: props.address},
      		coords: {lat: props.lat, lng: props.lng},
      	},      		
      	infowindowOpen: true
	}, ()=>this.props.getClickedMarker(this.state.clickedMarker))	

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
	closeIw(){
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
			>
			</Infowindow>
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
