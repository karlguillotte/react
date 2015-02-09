import React from 'react';
import Store from '../stores/Search';
import Actions from '../actions/Search';
import { Paper, Icon, Toolbar, ToolbarGroup } from 'material-ui';
import { Link, Navigation } from 'react-router';
import '../../styles/SearchBar.less';

export default React.createClass({
	mixins: [Navigation],
	getInitialState() {
		return {
			term: Store.getTerm()
		};
	},
	componentWillMount() {
		Store.addChangeListener(this.setTerm);
	},
	componentWillUnmount() {
		Store.removeChangeListener(this.setTerm);
	},
	componentDidMount() {
		var input = this.input();
		
		input.focus();
		input.select();
	},
	input() {
		return this.refs.search.getDOMNode();
	},
	setTerm() {
		var term = Store.getTerm();

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
	onSearchInputKeyUp(event) {
		if (event.key !== 'Escape') {
			return;
		}

		var {path} = this.props;

		this.transitionTo(path);
	},
	render() {
		var clear = null;

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
						<Link to={this.props.path}>
							<Icon icon="navigation-arrow-back" />
						</Link>
					</ToolbarGroup>
					<div className="search-container">
						<input type='search' ref='search' name='search' defaultValue={this.state.term} onKeyUp={this.onSearchInputKeyUp} onChange={this.onSearchInputChange} />
					</div>
					{clear}
				</Toolbar>
			</Paper>
		);
	}
});