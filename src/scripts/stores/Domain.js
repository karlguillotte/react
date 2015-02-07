import { TrailsApi, RegionsApi } from '../services/api/Domain';
import { Map } from 'immutable';
import Base from './Base';

class Store extends Base {
	constructor(api) {
		super.constructor();
		
		this.api = api;
		this.features = new Map();
		this.shouldRequest = true;
	}
	onAction() {
		return true;
	}
	getAll(options) {
		if (this.features.isEmpty() && this.shouldRequest) {
			this.shouldRequest = false;
			this.api.request(options).then(data => {
				this.features = this.features.merge(data.map(f => [f.id, f]));
				this.emit();
			});
		}

		return this.features;
	}
	get(id, options) {
		if (this.features.has(id)) {
			return this.features.get(id);
		}

		this.api.request(id, options).then(f => {
			this.features = this.features.set(f.id, f);
			this.emit();
		});
	}
}

export default {
	TrailsStore: new Store(TrailsApi),
	RegionsStore: new Store(RegionsApi)
};

