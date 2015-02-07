import Base from './Base';
import { TrailsStore, RegionsStore } from './Domain';
import { Map, List } from 'immutable';
import Sifter from 'sifter';
import SearchConstants from '../constants/Search';
import Dispatcher from '../Dispatcher';

// Private variables
var term = null;
var limit = 5;
var features = Map({
	trails: Map(),
	regions: Map()
});
var stores = Map({
	trails: TrailsStore,
	regions: RegionsStore
});

// Private functions
function featureToItem(feature) {
	var { id, title, type } = feature;

	return {
		payload: `${type}-${id}`, 
		text: title,
		icon: type === 'trail' ? 'maps-directions-bike' : 'maps_place',
		type: type,
		id: id
	};
}
function getStore(type) {
	return stores.get(type) || stores.get(`${type}s`);
}
function addListeners() {
	stores.forEach((store, type) => {
		store.addListener(() => {
			features = features.set(type, store.getAll());
			this.emit();
		});
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
			case SearchConstants.SET_TERM:
				term = action.term;
				this.emit();
			break;
			case SearchConstants.RESET_TERM:
				term = null;
				this.emit();
			break;
			case SearchConstants.SELECT_ITEM: 
				this.emit();
			break;
		}

		return true;
	}
	getFeature({type, id}) {
		return getStore(type).get(id).toJS();
	}
    getItems() {
    	var items = new List();

    	features.forEach(function(features, type) {
			if (term) {
				features = features.toList().toJS();
				
				var sifter = new Sifter(features);
				var result = sifter.search(term, {
					fields: ['title'],
					limit: limit
				});
				
				items = items.concat(result.items.map(function(item) {
					return features[item.id];
				}));
			} else {
				items = items.concat(features.slice(0, limit).toList());
			}    		
    	});

    	return items.toJS().map(featureToItem);
    }
    getTerm() {
    	return term;
    }
};


export default new Store();