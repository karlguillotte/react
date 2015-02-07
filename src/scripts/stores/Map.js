import { latLngBounds } from 'leaflet';
import { Map } from 'immutable';
import Base from './Base';
import Storage from '../services/Storage';
import { TrailsStore, RegionsStore } from '../stores/Domain';
import SearchConstants from '../constants/Search';
import SearchStore from '../stores/Search';
import MapConstants from '../constants/Map';

// Private variables
var storage = new Storage('354aaae9-8eba-4ad0-9478-ed45192da828');
var center = Map({ lat: 49.5, lng: -123.5 });
var bounds = Map({ south: 0, west: 0, north: 0, east: 0 });
var layers = Map({
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
var stores = Map({
	trails: TrailsStore,
	regions: RegionsStore
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
function updateBounds(coordinates, force) {
	var llb = latLngBounds(coordinates);
	var west = llb.getWest();
	var south = llb.getSouth();
	var east = llb.getEast();
	var north = llb.getNorth();
	var newBounds = { west, south, east, north };
	
	bounds = force ? Map(newBounds) : bounds.merge(newBounds);
}
function addListeners() {
	stores.forEach((store, type) => {
		store.addListener(() => {
			var layer = layers.get(type);
			
			layer = layer.set('features', store.getAll());

			layers = layers.set(type, layer);
			this.emit();
		});
		store.getAll();
	});
}
// Store Class
class Store extends Base {
	constructor() {
		super.constructor();

		addListeners.call(this);
	}
	onAction(action) {
		switch(action.type) {
			case SearchConstants.SELECT_ITEM: 
				var feature = selection = SearchStore.getFeature(action.item);

				updateBounds(feature.coordinates);

				this.emit();
			break;
			case MapConstants.SELECT_FEATURE: 
				var feature = selection = action.feature;

				updateBounds(feature.coordinates);

				this.emit();
			break;
			case MapConstants.UNSELECT_FEATURE: 
				selection = null;

				this.emit();
			break;
			case MapConstants.FIT_TO_FEATURE: 
				var feature = action.feature;

				updateBounds(feature.coordinates, true);

				this.emit();
			break;
			case MapConstants.CHANGE_ZOOM: 
				setZoom(action.zoom);
				this.emit();
			break;
			case MapConstants.CHANGE_CENTER: 
				setCenter(action.center);
				this.emit();
			break;
		}

		return true;
	}
	getLayers() {
		return layers;
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

export default new Store();