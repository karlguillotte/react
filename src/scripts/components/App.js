import React from 'react';
import Map from './Map';
import { RouteHandler } from 'react-router';
import '../../styles/App.less';

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

export default React.createClass({
	render() {
	    return (
	    	<div className="App">
		    	<RouteHandler />
	            <Map />
	    	</div>
    	);
	}
});