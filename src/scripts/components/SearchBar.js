'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var mui = require("material-ui");
var Paper = mui.Paper;
var IconButton = mui.IconButton;
var Menu = mui.Menu;
var MenuItem = mui.MenuItem;
var store = require('../stores/items');
var actions = require('../actions/items');

require('../../styles/SearchBar.less');

module.exports = React.createClass({
	displayName: 'SearchBar',
	mixins: [Reflux.connect(store, 'items')],
	getInitialState: function() {
		return {
			active: false,
			items: []
		};
	},
	componentDidMount: function() {
		actions.search();
	},
	getActionIcon: function() {
		return this.state.active ? 'navigation-arrow-back' : 'action-search';
	},
	getInput: function() {
		return this.refs.search.getDOMNode();
	},
	getValue: function() {
		return this.getInput().value;
	},
	onChange: function() {
		actions.search(this.getValue());
	},
	activate: function() {
		this.setState({ active: true });
	},
	deactivate: function() {
		this.setState({ active: false });
	},
	focus: function() {
		this.getInput().focus();
	},
	blur: function() {
		this.getInput().blur();
	},
	onItemClick: function() {
		console.log(arguments);
	},
	menu: function() {
		if (!this.state.active) {
			return;
		}

		var items = this.state.items;

		if (items.length === 0) {
			items = [{
				payload: '1',
				type: MenuItem.Types.SUBHEADER,
				text: 'Nothing found "' + this.getValue() + '"'
			}];
		}

		return <Menu menuItems={items} onItemClick={this.onItemClick} rounded={false} autoWidth={false} />;
	},
	icon: function() {
		var click = this.state.active ? function(event) {
			// event.preventDefault();
			// event.stopPropagation();
			// this.blur();
		} : function(event) {
			this.activate();
			this.focus();
		};

		return <IconButton icon={this.getActionIcon()}  onClick={click.bind(this)} />;
	},
	render: function () {
		return (
			<div className="SearchBar">
				<Paper rounded={false} >
					{this.icon()}
					<input type="search" ref="search" name="search" onChange={this.onChange} onFocus={this.activate} onBlur={this.deactivate} />
				</Paper>
				{this.menu()}
			</div>
		);
	}
});