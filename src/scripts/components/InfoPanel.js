import React from 'react/addons';
import { Paper, Toolbar, ToolbarGroup, Icon } from 'material-ui';
import MapStore from '../stores/Map';
import { Link } from 'react-router';
import MapActions from '..//actions/Map';
import '../../styles/InfoPanel.less';

export default React.createClass({
	getInitialState() {
		var selection = MapStore.getSelection();

		return {
			feature: selection,
			opened: !!selection
		};
	},
	componentWillMount() {
		MapStore.addListener(this.onStoreChange);
	},
	componentWillUnmount() {
		MapStore.removeListener(this.onStoreChange);
	},
	onStoreChange() {
		this.setState({
			feature: MapStore.getSelection(),
			opened: true
		});
	},
	close() {
		MapActions.unselectFeature();
	},
	render() {
		var { feature, opened } = this.state;
		
		if (!feature || !opened) {
			return null;
		}

		var { title, description } = feature;
		var zoom = MapActions.fitToFeature.bind(this, feature);

	    return (
			<Paper className="InfoPanel" zDepth={5} rounded={false}>
				<Toolbar>
					<ToolbarGroup float="left">
						<h4 className="title">{title}</h4>
					</ToolbarGroup>
					<ToolbarGroup float="right">
						<Icon icon="action-search" onClick={zoom} />
						<span className="mui-toolbar-separator">&nbsp;</span>
						<Icon icon="content-clear" onClick={this.close} />
					</ToolbarGroup>
				</Toolbar>
          		<div className="content">{description}</div>
          	</Paper>
		);
	}
});