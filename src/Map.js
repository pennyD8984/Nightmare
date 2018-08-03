import React, { Component } from 'react';
import axios from 'axios'
import GoogleMapReact from 'google-map-react';
import Places from './Places.js';
import { mapStyle } from './style.js';
import Infowindow from './Infowindow.js'
  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';
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
			venues: null,
			center: {lat: 49.240157, lng: 6.996933},
			zoom: 13,
			query: '',
			clickedMarker: {
				coords: { lat: 0, lng: 0},
				clickedMarkerInfo:{name: '', address: ''},
				infowindowOpen: false,
			}
		}
		this.onChildClick = this.onChildClick.bind(this);
	} 	


// Receive the updates from parent and fetch the data
componentWillReceiveProps(props){
	this.setState({
		query: this.props.query,
	})

	this.fetchData(this.state.query);
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

	// If the fetching fails, an error is thrown in the console
	// TODO: add response detail to aside
	.catch((response) => {
		console.log('error retreiving data: ' + response);
	})
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

/*	// check if iw is already open, if not
	// show infowindow when marker is clicked
	if (this.state.clickedMarker.infowindowOpen){
		iw = <Infowindow 
			clickedMarker={this.state.clickedMarker.coords}>
			</Infowindow>
	}
*/

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
				<Places 
					key={45245}
					lat={49.240157}
					lng={6.996933}
					name={"Valentina Sushi"}
					address={"via Mokona 666"}

				>
				</Places>
      </GoogleMapReact>
    );
  }
}

