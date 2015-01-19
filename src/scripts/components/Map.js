'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Router = require('react-router');
var {Circle, CircleMarker, Map, MultiPolygon, MultiPolyline, Polygon, Polyline, Popup, Rectangle, TileLayer} = require('react-leaflet');
var store = require('../stores/geometries');

require('../../styles/Map.less');
require('../../../node_modules/react-leaflet/node_modules/leaflet/dist/leaflet.css');

module.exports = React.createClass({
	mixins: [Router.State, Reflux.connect(store, 'geometries')],
	getInitialState: function() {
		var query = this.getQuery();
		var zoom = query.zoom ? Number(query.zoom) : 7;

		return {
			zoom: zoom,
			center: [49.5, -123.5]
		}
	},
	handleMoveend: function(event) {
		var center = event.target.getCenter();

		this.setState({
			center: [center.lat, center.lng]
		});
	},
	handleZoomend: function(event) {
		this.setState({
			zoom: event.target.getZoom()
		});
	},
	render: function () {
	  	var url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
	  	var center = this.state.center;
	  	var zoom = this.state.zoom;

	  	return	(
	  		<Map className='Map' ref='map' center={center} zoom={zoom} zoomControl={false} attributionControl={false} onLeafletMoveend={this.handleMoveend} onLeafletZoomend={this.handleZoomend}>
				<TileLayer url={url} />
			</Map>
		);
	}
});