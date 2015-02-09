import BaseStore from './Base';;
import Stores from './Domain';

function getStore({type}) {
	return Stores.get(type) || Stores.get(`${type}s`);
}

class DomainStore extends BaseStore {
	onAction() {
		return true;
	}
	get(params) {
		return getStore(params).get(params);
	}
}

export default new DomainStore();