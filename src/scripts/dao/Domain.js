import Dispatcher from '../Dispatcher';
import trails from './data/trails';
import regions from './data/regions';
import fetch from 'whatwg-fetch';
import {Promise} from 'es6-promise';

class DomainApi {
	constructor(type, actions) {
		this.type = type;
		this.prefix = '/api';
	}
	request(options) {
		var url = `${this.prefix}/${this.type}s`;
		var features;

		if (options && typeof options.id !== 'undefined') {
			var id = options.id;
			delete options.id;
			
			url = `${this.prefix}/${this.type}s/${id}`;
		}

		// TODO Having a real api server
		if (/trails/.test(url))
			features = Promise.resolve(trails);
		if (/regions/.test(url))
			features = Promise.resolve(regions);

		return features.then(features => {
			if (options && options.id) {
				return features.filter(feature => feature.id === options.id)[0];
			}
			if (options && options.alias) {
				return features.filter(feature => feature.alias === options.alias)[0];
			}
			return features;
		});

		return fetch(url, options);
	}
}

export default {
	trails: new DomainApi('trail'),
	regions: new DomainApi('region')
};
