import EventEmitter from 'events';
import Dispatcher from '../Dispatcher';

const EVENT = 'change';

class Store extends EventEmitter {
	constructor() {
		this.token = Dispatcher.register(this.onAction.bind(this));
	}
	onAction(action) {
		throw 'Not implemented';
	}
	emitChange() {
		super.emit(EVENT);
	}
	getToken() {
		return this.token;
	}
	addChangeListener(callback) {
		super.addListener(EVENT, callback);
	}
	removeChangeListener(callback) {
		super.removeListener(EVENT, callback);
	}
}

export default Store;