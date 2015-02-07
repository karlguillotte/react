import React from 'react';
import Immutable from 'immutable';
import Leaflet from 'leaflet';
import { State, Navigation, Link } from 'react-router';
import { Map, TileLayer, Marker, Popup, FeatureGroup, GeoJson } from 'react-leaflet';
import MapStore from '../stores/Map';
import MapActions from '../actions/Map';
import '../../styles/Map.less';
import 'leaflet/dist/leaflet.css';

var VectorLayersFactories = new Immutable.Map({
	trails: Leaflet.polyline,
	regions: Leaflet.polygon
});

export default React.createClass({
	mixins: [State, Navigation],
	getInitialState() {
		// var query = this.getQuery();
		// var zoom = query.zoom ? Number(query.zoom) : MapStore.getZoom();

		return {
			id: 1,
			zoom: MapStore.getZoom(),
			center: MapStore.getCenter(),
			bounds: MapStore.getBounds(),
			hasLocation: false,
			location: null,
			layers: MapStore.getLayers()
		}
	},
	handleMoveend(event) {
		var center = event.target.getCenter();

		MapActions.changeCenter(center);
	},
	handleZoomend(event) {
		var zoom = event.target.getZoom();

		MapActions.changeZoom(zoom);
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
		MapStore.addListener(this.onStoreChange);
	},
	componentWillUnmount() {
		MapStore.removeListener(this.onStoreChange);
	},
	onStoreChange() {
		this.setState({
			bounds: MapStore.getBounds(),
			layers: MapStore.getLayers()
		});
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
	onFeatureClick(feature, event) {
		var map = this.getMap();

		map.closePopup();
		
		MapActions.selectFeature(feature);
	},
	handleClick() {
		if (!this.isActive('index')) {
			this.transitionTo('index');
		}
	},
	onPopupClick(feature, event) {
		event.preventDefault();
		this.onFeatureClick(feature);
	},
	createPopup(feature) {
		var popup = document.createElement('div');
		var anchor = document.createElement('a');
		
		anchor.textContent = feature.title;
		anchor.href = "#";
		anchor.onclick = this.onPopupClick.bind(this, feature);

		popup.appendChild(anchor);

		return popup;
	},
	render () {
	  	var url = 'http://{s}.tiles.mapbox.com/v4/examples.ra3sdcxr/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q';
	  	var center = this.state.center.toJS();
	  	var zoom = this.state.zoom;
	  	var id = this.state.id++;
	  	var onFeatureClick = this.onFeatureClick;
		var layers = this.state.layers.map(function(layer, key) {
			var features = layer.get('features').toList().toJS();
			var style = layer.get('style');
			var factory = VectorLayersFactories.get(key);
			var vectors = features.map(f => {
				var onClick = onFeatureClick.bind(this, f);
				var popup = this.createPopup(f);

				return factory(f.coordinates, style).bindPopup(popup);
			}, this);

			return <FeatureGroup key={`${key}-${id}`} layers={vectors} />;
		}, this).toList();
	    var location = null;

		if (this.state.hasLocation) {
			location = (
				<Marker position={this.state.location}>
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