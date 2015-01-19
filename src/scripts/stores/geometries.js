'use strict';

var Reflux = require('reflux');
var trailsStore = require('./domain/trails');
var regionsStore = require('./domain/regions');
var actions = require('../actions/geometries');

module.exports = Reflux.createStore({
	listenables: actions,
	init: function() {
		
	}
});