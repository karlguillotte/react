import React from 'react';
import SearchStore from '../stores/Search';
import Actions from '../actions/Search';
import { Paper, Icon, Toolbar, ToolbarGroup } from 'material-ui';
import { Link } from 'react-router';

import '../../styles/SearchBar.less';

export default React.createClass({
	getInitialState() {
		return {
			term: SearchStore.getTerm()
		};
	},
	componentWillMount() {
		SearchStore.addListener(this.setTerm);
	},
	componentWillUnmount() {
		SearchStore.removeListener(this.setTerm);
	},
	componentDidMount() {
		this.input().focus();
	},
	input() {
		return this.refs.search.getDOMNode();
	},
	setTerm() {
		var term = SearchStore.getTerm();

		this.setState({ term });
	},
	resetTerm() {
		var input = this.input();
		
		Actions.resetTerm();
		
		input.value = null;
		input.focus();
	},
	onSearchInputChange() {
		var term = this.input().value;

		Actions.setTerm(term);
	},
	render() {
		var clear;
		if (this.state.term) {
			clear = (
				<ToolbarGroup float="right">
					<Icon icon="content-clear" onClick={this.resetTerm} />
				</ToolbarGroup>
			);
		}

		return (
			<Paper className="SearchBar" zDepth={2} rounded={false}>
				<Toolbar>
					<ToolbarGroup float="left">
						<Link to="index">
							<Icon icon="navigation-arrow-back" />
						</Link>
					</ToolbarGroup>
					<div className="search-container">
						<input type='search' ref='search' name='search' defaultValue={this.state.term} onChange={this.onSearchInputChange} />
					</div>
					{clear}
				</Toolbar>
			</Paper>
		);
	}
});
