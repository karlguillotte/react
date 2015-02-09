import { latLngBounds } from 'leaflet';
import { Map } from 'immutable';
import BaseStore from './Base';
import Storage from '../services/Storage';
import Stores from '../stores/Domain';
import SearchConstants from '../constants/Search';
import FeatureStore from '../stores/Features';
import MapConstants from '../constants/Map';
import {Promise} from 'es6-promise';
import Dispatcher from '../Dispatcher';

// Private variables
var storage = new Storage('354aaae9-8eba-4ad0-9478-ed45192da828');
var center = Map({ lat: 49.5, lng: -123.5 });
var bounds = Map({ south: 0, west: 0, north: 0, east: 0 });
var Layers = Map({
	trails: Map({
		style: {
			color: '#ff0000'
		},
		features: Map()
	}),
	regions: Map({
		style: {
			color: '#0000ff'
		},
		features: Map()
	})
});
var selection = null;

// Private functions
var getZoom = () => storage.get('zoom') || 7;
var setZoom = zoom => storage.set('zoom', zoom);
var getCenter = () => center.merge(storage.get('center'));
var setCenter = function(center) {
	var c = center.toJS ? center.toJS() : center;

	return storage.set('center', c);
};
function updateBounds({coordinates}, force) {
	var llb = latLngBounds(coordinates);
	var west = llb.getWest();
	var south = llb.getSouth();
	var east = llb.getEast();
	var north = llb.getNorth();
	var newBounds = { west, south, east, north };
	
	bounds = force ? Map(newBounds) : bounds.merge(newBounds);
}

// Store Class
class MapStore extends BaseStore {
	onAction(action) {
		// var tokens = Stores.toList().map(s => s.token).toJS();

		switch(action.type) {
			case SearchConstants.SELECT_ITEM: 
				var {item,target} = action;

				FeatureStore.get(item).then(feature => {
					this.transitionTo(feature, target);
				});
			break;
			case MapConstants.SELECT_FEATURE: 
				var {feature,target} = action;

				this.transitionTo(feature, target);
			break;
			case MapConstants.UNSELECT_FEATURE: 
				var {target} = action;
				
				selection = null;

				target.transitionTo('index');
				
				this.emitChange();
			break;
			case MapConstants.FIT_TO_FEATURE: 
				var {feature} = action;

				updateBounds(feature, true);

				this.emitChange();
			break;
			case MapConstants.CHANGE_ZOOM: 
				var {zoom} = action;

				setZoom(zoom);

				this.emitChange();
			break;
			case MapConstants.CHANGE_CENTER: 
				var {center} = action;

				setCenter(center);

				this.emitChange();
			break;
		}

		return true;
	}
	transitionTo(feature, target) {
		updateBounds(feature);
		selection = feature;
		this.emitChange();
		target.transitionTo(feature.type, feature);
	}
	getLayers() {
		var promises = Stores.map((store, type) => {
			return store.getAll().then(features => {
				var layer = Layers.get(type);
					
				layer = layer.set('features', features);

				Layers = Layers.set(type, layer);
			});
		}).toArray();

		return Promise.all(promises).then(() => Layers);
	}
	getZoom() {
		return getZoom();
	}
	getCenter() {
		return getCenter();
	}
	getBounds() {
		return bounds;
	}
	getSelection() {
		return selection;
	}
}

export default new MapStore();