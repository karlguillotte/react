var storage = window.localStorage;
var stringify = JSON.stringify;
var parse = JSON.parse;

class Storage {
	constructor(uuid) {
		this.uuid = uuid;
	}
	toKey(key) {
		return `${this.uuid}:${key}`;
	}
	set(key, value) {
		return storage.setItem(this.toKey(key), stringify(value));
	}
	get(key) {
		return parse(storage.getItem(this.toKey(key)));
	}
}

export default Storage;