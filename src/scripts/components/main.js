import React from 'react';
import App from './App';
import Index from './Index';
import Search from './Search';
import Settings from './Settings';
import TrailElevation from './TrailElevation';
import InfoPanel from './InfoPanel';
import Description from './Description';
import Router from 'react-router';

import '../../styles/material-ui.less';

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
	<Route handler={App}>
		<Route name="index" path="/" handler={Index}>
			<Route name="region" path="regions/:alias" handler={InfoPanel}>
				<DefaultRoute name="region-description" handler={Description} />
			</Route>
			<Route name="trail" path="trails/:alias" handler={InfoPanel}>
				<DefaultRoute name="trail-description" handler={Description} />
				<Route name="trail-elevation" path="elevation" handler={TrailElevation} />
			</Route>
		</Route>
		<Route name="search" path="search" handler={Search} />
		<Route name="settings" path="settings" handler={Settings} />
	</Route>
);

Router.run(routes, /*Router.HistoryLocation, */Handler => {
  React.render(<Handler/>, document.body);
});

