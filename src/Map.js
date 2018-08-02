import React, { Component } from 'react';
import axios from 'axios'
import GoogleMapReact from 'google-map-react';
import Places from './Places.js';
import { mapStyle } from './style.js';
import Infowindow from './Infowindow.js'

function createMapOptions(maps) {
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
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
			query: '',
			center: {lat: 49.240157, lng: 6.996933},
			zoom: 16,
			clickedMarker: {
				coords: { lat: 0, lng: 0},
				clickedMarkerInfo:{name: '', address: ''},
				infowindowOpen: false,
			}
		}
		this.onChildClick = this.onChildClick.bind(this);
	} 	

componentDidMount(){
	this.fetchData('sushi'); // TODO: change when implement input field
}

onChildClick(key, props) {
	return (this.setState({
		center: {'lat': props.lat, 'lng': props.lng},
      	clickedMarker: {
      		clickedMarkerInfo:{name: props.name, address: props.address},
      		coords: {lat: props.lat, lng: props.lng},
      		infowindowOpen: true,
      	},
	})
	)
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
		radius: 20000,
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
	let iw;
	if (venues !== null){
		markers = venues.map(function(venue) {
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
	// show infowindow when marker is clicked
	if (this.state.clickedMarker.infowindowOpen){
		iw = <Infowindow 
			clickedMarker={this.state.clickedMarker.coords}/>		
	}

    return (
        <GoogleMapReact
	        options={createMapOptions}
	        bootstrapURLKeys={{key: 'AIzaSyD0bg8zynVSUQBNqTIp__dBgIrVghmv8Co'}}
			center={this.state.center}
          	defaultZoom={this.state.zoom}
          	onChildClick={this.onChildClick.bind(this)}
		>
		
		{markers}
		{iw}
      </GoogleMapReact>
    );
  }
}

