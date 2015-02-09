import React from 'react';
import Page from './Page';
import SearchBar from './SearchBar';
import Store from '../stores/Search';
import Actions from '../actions/Search';
import { List } from 'immutable';
import { Menu, MenuItem } from 'material-ui';
import { Navigation } from 'react-router';
import '../../styles/Search.less';

var Search = React.createClass({
	mixins: [Navigation],
	getInitialState() {
		this.setItems();

		return {
			items: new List()
		};
	},
	componentWillMount() {
		Store.addChangeListener(this.setItems);
	},
	componentWillUnmount() {
		Store.removeChangeListener(this.setItems);
	},
	setItems() {
		Store.getItems().then(items => this.setState({items}));
	},
	onItemClick(event, index, item) {
		Actions.selectItem({ item, target: this });
	},
	render() {
		var items = this.state.items.toJS();
		var term = Store.getTerm();
		var path = Search.fromTransition.path || 'index';

		if (items.length === 0 && term) {
			items = [{
				payload: '1',
				type: MenuItem.Types.SUBHEADER,
				text: `Nothing found "${term}"`
			}];
		}

		return (
			<Page className="Search">
				<SearchBar path={path} />
				<Menu menuItems={items} onItemClick={this.onItemClick} rounded={false} autoWidth={false} />
			</Page>
		);
	},
	statics: {
		fromTransition: {},
		willTransitionFrom(transition, params) {
			Search.fromTransition = {};
		}
	}
});

export default Search;