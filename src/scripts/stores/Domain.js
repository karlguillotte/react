import BaseStore from './Base';
import DomainsApis from '../dao/Domain';
import { Map } from 'immutable';
import {Promise} from 'es6-promise';

class DomainStore extends BaseStore {
	constructor(api) {
		super.constructor();
		
		this.api = api;
		this.features = Map();
	}
	onAction() {
		return true;
	}
	getAll(options) {
		if (!this.features.isEmpty()) {
			return Promise.resolve(this.features);
		}

		return this.api.request(options).then(data => {
			this.features = this.features.merge(data.map(f => [f.id, f]));
			
			return this.features;
		});
	}
	get({id, alias}) {
		var feature;

		if (typeof id !== 'undefined') {
			if (feature = this.features.get(id)) {
				return Promise.resolve(feature.toJS ? feature.toJS() : feature);
			}
		}

		if (typeof alias !== 'undefined') {
			if (feature = this.features.find(f => f.alias === alias)) {
				return Promise.resolve(feature.toJS ? feature.toJS() : feature);
			}
		}

		var params = id ? {id} : {alias};

		return this.api.request(params).then(feature => {
			this.features = this.features.set(feature.id, feature);
			
			return feature;
		});
	}
}

export default Map({
	trails: new DomainStore(DomainsApis.trails),
	regions: new DomainStore(DomainsApis.regions)
});

