'use strict';

var Immutable = require('immutable');
var Reflux = require('reflux');
var Sifter = require('sifter');
var trailsStore = require('./domain/trails');
var regionsStore = require('./domain/regions');
var trailsActions = require('../actions/domain/trails');
var regionsActions = require('../actions/domain/regions');
var actions = require('../actions/items');
var featureToItem = function(feature) {
	var isTrail = !!feature.trailid;
	var type = isTrail ? 'trail' : 'region';

	return {
		payload: type + '-' + feature.id, 
		text: feature.title,
		icon: isTrail ? 'maps-directions-bike' : 'maps_place',
		type: type
	};
};
var LIMIT = 5;

module.exports = Reflux.createStore({
	listenables: actions,
	init: function() {
		this.items = Immutable.Seq();
		this.term = null;

		this.listenTo(trailsStore, this.setFeatures);
		this.listenTo(regionsStore, this.setFeatures);
		
		trailsActions.load();
		regionsActions.load();
	},
    onSearch: function(term) {
    	this.term = term;
    	this.searchItems();
	},
	setFeatures: function(features) {
		this.items = this.items.concat(features);
    },
    searchItems: function() {
    	var items = this.items;
    	var term = this.term;

		if (term) {
			var sifter = new Sifter(this.items.toArray());
			var result = sifter.search(term, {
				fields: ['title'],
				limit: LIMIT
			});
			
			items = Immutable.Seq(result.items.map(function(item) {
				return items.get(item.id);
			}));
		}

		this.trigger(items.map(featureToItem).sortBy(function(feature) {
			return feature.type;
		}).slice(0, LIMIT * 2).toArray());
    }
});