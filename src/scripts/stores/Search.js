import BaseStore from './Base';
import Sifter from 'sifter';
import { Map, List } from 'immutable';
import Stores from './Domain';
import SearchConstants from '../constants/Search';
import {Promise} from 'es6-promise';

// Private variables
const LIMIT = 5;
var term = null;

// Private functions
function featureToItem({id, title, type}) {
	return {
		payload: `${type}-${id}`, 
		text: title,
		icon: type === 'trail' ? 'maps-directions-bike' : 'maps_place',
		type: type,
		id: id
	};
}

// Store Class
class Store extends BaseStore {
	onAction(action) {
		switch(action.type) {
			case SearchConstants.SET_TERM:
				term = action.term;
				this.emitChange();
			break;
			case SearchConstants.RESET_TERM:
				term = null;
				this.emitChange();
			break;
		}

		return true;
	}
    getItems() {
    	// TODO Lots of work can be done to make it faster ;)
    	var items = new List();
    	var promises = Stores.map((store, type) => {
			return store.getAll().then(features => {
				if (term) {
					features = features.toList().toJS();
					
					var sifter = new Sifter(features);
					var result = sifter.search(term, {
						fields: ['title'],
						limit: LIMIT
					});
					
					items = items.concat(result.items.map(item => features[item.id]));
				} else {
					items = items.concat(features.toList().take(LIMIT).toJS());
				}
			});
    	}).toArray();
    	
    	return Promise.all(promises).then(() => items.map(featureToItem));
    }
    getTerm() {
    	return term;
    }
};


export default new Store();