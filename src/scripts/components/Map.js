import React from 'react';
import Immutable from 'immutable';
import Leaflet from 'leaflet';
import { State, Navigation, Link } from 'react-router';
import { Map, TileLayer, Marker, Popup, FeatureGroup, GeoJson } from 'react-leaflet';
import MapStore from '../stores/Map';
import MapActions from '../actions/Map';
import '../../styles/Map.less';
import 'leaflet/dist/leaflet.css';

var VectorLayersFactories = Immutable.Map({
	trails: Leaflet.polyline,
	regions: Leaflet.polygon
});

export default React.createClass({
	mixins: [State, Navigation],
	getInitialState() {
		this.setLayers();

		return {
			zoom: MapStore.getZoom(),
			center: MapStore.getCenter(),
			bounds: MapStore.getBounds(),
			hasLocation: false,
			location: null,
			layers: Immutable.Map()
		}
	},
	handleMoveend(event) {
		var center = event.target.getCenter();
		var calback = MapActions.changeCenter.bind(null, center);

		setTimeout(calback, 250);
	},
	handleZoomend(event) {
		var zoom = event.target.getZoom();
		var calback = MapActions.changeZoom.bind(null, zoom);

		setTimeout(calback, 250);
	},
	handleLocationFound(event) {
		this.setState({
			hasLocation: true,
			location: event.latLng
		});	
	},
	componentDidMount() {
		this.getMap().locate();
	},
	getMap() {
		return this.refs.map.getLeafletElement();
	},
	componentWillMount() {
		MapStore.addChangeListener(this.onStoreChange);
	},
	componentWillUnmount() {
		MapStore.removeChangeListener(this.onStoreChange);
	},
	shouldComponentUpdate(nextProps, nextState) {
		return nextState.layers !== this.state.layers;
	},
	setLayers() {
		MapStore.getLayers().then(layers => this.setState({layers}));
	},
	onStoreChange() {
		this.setState({
			bounds: MapStore.getBounds()
		});
		this.setLayers();
	},
	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.bounds !== nextState.bounds) {
			var map = this.getMap();
			var nb = nextState.bounds;
			var sw = Leaflet.latLng(nb.get('south'), nb.get('west'));
			var ne = Leaflet.latLng(nb.get('north'), nb.get('east'));
			var bounds = Leaflet.latLngBounds(sw, ne);
			
			map.fitBounds(bounds);
		}

		return this.state.layers !== nextState.layers;
	},
	onFeatureClick(feature) {
		MapActions.selectFeature({ feature, target: this });
	},
	handleClick() {
		if (!this.isActive('index')) {
			this.transitionTo('index');
		}
	},
	render () {
	  	var url = 'http://{s}.tiles.mapbox.com/v4/examples.ra3sdcxr/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q';
	  	var {center,zoom,layers,hasLocation,location} = this.state;
	  	
	  	center = center.toJS();
		
		layers = layers.map((layer, key) => {
			var features = layer.get('features');
			var style = layer.get('style');
			var factory = VectorLayersFactories.get(key);
			var vectors = features.toList().toJS().map(feature => {
				var onClick = this.onFeatureClick.bind(this, feature);
				var {coordinates} = feature;

				return factory(coordinates, style).on('click', onClick);
			});

			return <FeatureGroup key={key} layers={vectors} />;
		}).toList();

		if (hasLocation && location) {
			location = (
				<Marker position={location}>
					<Popup>
						<span>You are here</span>
					</Popup>
				</Marker>
			);
		}

	  	return	(
	  		<Map className='Map' ref='map' 
  				center={center} 
  				zoom={zoom} 
  				zoomControl={false} 
  				attributionControl={false} 
  				onLeafletMoveend={this.handleMoveend} 
  				onLeafletClick={this.handleClick} 
  				onLeafletZoomend={this.handleZoomend} 
  				onLeafletLocationfound={this.handleLocationFound}>
					<TileLayer url={url} />
		  			{location}
					{layers.get(1)}
					{layers.get(0)}
			</Map>
		);
	}
});