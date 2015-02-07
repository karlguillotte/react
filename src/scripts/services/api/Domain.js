import Dispatcher from '../../Dispatcher';
import reqwest from 'reqwest';
import trails from './data/trails';
import regions from './data/regions';
import {Promise} from 'es6-promise';

class Api {
	constructor(type, actions) {
		this.type = type;
		this.prefix = '/api';
	}
	request(options) {
		var url = `${this.prefix}/${this.type}s`;

		if (arguments.length > 1) {
			var id = arguments[0];
			
			url = `${this.prefix}/${this.type}s/${id}`;
			options = arguments[1];
		}

		// TODO Having a real api server
		if (/trails/.test(url))
			return Promise.resolve(trails);
		if (/regions/.test(url))
			return Promise.resolve(regions);

		return reqwest({
			url,
			data: options
		});
	}
}

export default {
	TrailsApi: new Api('trail'),
	RegionsApi: new Api('region')
};
