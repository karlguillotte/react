import React from 'react/addons';
import { Paper, Toolbar, ToolbarGroup, Icon, DropDownIcon, DropDownMenu } from 'material-ui';
import {List} from 'immutable';
import Search from './Search';
import MapStore from '../stores/Map';
import FeatureStore from '../stores/Features';
import { Link, Navigation, State, RouteHandler } from 'react-router';
import MapActions from '../actions/Map';
import '../../styles/InfoPanel.less';

export default React.createClass({
	mixins: [Navigation, State],
	getInitialState() {
		return {
			feature: {},
			menuItems: new List()
		};
	},
	componentWillMount() {
		this.setStateFeature();
	},
	componentWillReceiveProps(nextProps) {
		this.setStateFeature();
	},
	shouldComponentUpdate(nextProps, nextState) {
		var {feature,menuItems} = this.state;

		return nextState.feature !== feature || nextState.feature !== menuItems;
	},
	setStateFeature() {
		var params = this.getParams();

		params.type = this.getPath().split( /\/(\w+)\//)[1];
		
		FeatureStore.get(params).then(feature => this.setState({ feature }));
	},
	close() {
		MapActions.unselectFeature({ target: this });
	},
	onResizerMouseDown(event) {
		var node = this.getDOMNode();
		
		event.preventDefault();
		
		this._pageY = event.pageY;
		this._height = node.clientHeight;
		this._moved = false;

		if (typeof this._initialHeight === 'undefined') {
			this._initialHeight = this._height;
		}

		document.addEventListener('mousemove', this.onResizerMouseMove);
		document.addEventListener('mouseup', this.onResizerMouseUp);
	},
	onResizerMouseMove(event) {
		var node = this.getDOMNode();

		node.style.height = `${this._height + this._pageY - event.pageY}px`;

		this._moved = true;
	},
	onResizerMouseUp(event) {
		var node = this.getDOMNode();

		document.removeEventListener('mousemove', this.onResizerMouseMove);
		document.removeEventListener('mouseup', this.onResizerMouseUp);

		if (!this._moved) {
			let height = this._initialHeight;

			if (node.clientHeight === this._initialHeight) {
				height = 150;
			}
			
			node.style.height = `${height}px`;
		}

		this.updateMenuItems();
	},
	updateMenuItems() {
		var node = this.getDOMNode();
		var {menuItems,feature} = this.state;
		var {type} = feature;

		if (node.clientHeight < 100) {
			menuItems = menuItems.clear();
		} else {
			menuItems = menuItems.set(0, { name: `${type}-description`, text: 'Description' });
			if (type === 'trail') {
				menuItems = menuItems.set(1, { name: 'trail-elevation', text: 'Elevation' });
			} else {
				menuItems = menuItems.remove(1);
			}
		}

		this.setState({menuItems});
	},
	onMenuItemChange(event, selectedIndex, menuItem) {
		var {feature} = this.state;
		var {name:path} = menuItem;

		this.transitionTo(path, feature);
	},
	render() {
		var { feature, menuItems } = this.state;
		var { title } = feature;
		var zoom = MapActions.fitToFeature.bind(this, feature);
		var options = null;

		if (menuItems.count() > 1) {
			// DropDownIcon
			// {options && <span className="mui-toolbar-separator">&nbsp;</span>}
			options = <DropDownMenu icon="navigation-expand-more" onChange={this.onMenuItemChange} menuItems={menuItems.toJS()} />;
		}

	    return (
			<Paper className="InfoPanel" zDepth={5} rounded={false}>
				<Toolbar>
					<ToolbarGroup float="left" onClick={console.warn.bind(console, 'working')} >
						<h1 className="mui-toolbar-title" onClick={zoom}>{title}</h1>
					</ToolbarGroup>
					<ToolbarGroup float="right">
						{options}
						<Icon icon="navigation-more-vert" onMouseDown={this.onResizerMouseDown} />
						<Icon icon="content-clear" onClick={this.close} />
					</ToolbarGroup>
				</Toolbar>
				<div className="content">
					<RouteHandler feature={feature} />
				</div>
          	</Paper>
		);
	},
	statics: {
		willTransitionTo(transition) {
			Search.fromTransition = transition;
		},
		willTransitionFrom(transition) {
			if (transition.path === '/') {
				Search.fromTransition = transition;
			}
		}
	}
});