import React from 'react';
import Page from './Page';
import SearchBar from './SearchBar';
import Store from '../stores/Search';
import Actions from '../actions/Search';
import { Menu, MenuItem } from 'material-ui';
import { Navigation } from 'react-router';
import '../../styles/Search.less';

export default React.createClass({
	mixins: [Navigation],
	getInitialState() {
		return {
			items: Store.getItems()
		};
	},
	componentWillMount() {
		Store.addListener(this.setItems);
	},
	componentWillUnmount() {
		Store.removeListener(this.setItems);
	},
	setItems() {
		this.setState({
			items: Store.getItems()
		});
	},
	onItemClick(event, index, item) {
		Actions.selectItem(item);
		this.transitionTo("index");
	},
	render() {
		var items = this.state.items;

		if (items.length === 0) {
			items = [{
				payload: '1',
				type: MenuItem.Types.SUBHEADER,
				text: `Nothing found "${Store.getTerm()}"`
			}];
		}

		return (
			<Page className="Search">
				<SearchBar />
				<Menu menuItems={items} onItemClick={this.onItemClick} rounded={false} autoWidth={false} />
			</Page>
		);
	}
});
