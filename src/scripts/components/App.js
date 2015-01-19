"use strict";

var React = require("react/addons");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var mui = require("material-ui");
var FloatingActionButton = mui.FloatingActionButton;


// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// Styles
require("../../styles/App.less");

module.exports = React.createClass({
	render: function() {
	    return (
    		<div className="App">
    			<RouteHandler />
				<Link to="settings" className="settings-link">
					<FloatingActionButton icon="action-settings" mini={true} />
				</Link>
    		</div>
		);
	}
});