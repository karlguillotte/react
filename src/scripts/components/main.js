import React from 'react';
import App from './App';
import Index from './Index';
import Search from './Search';
import Settings from './Settings';
import Router from 'react-router';

import '../../styles/material-ui.less';

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
	<Route handler={App}>
		<DefaultRoute name="index" handler={Index} />
		<Route name="search" path="/search" handler={Search} />
		<Route name="settings" path="/settings" handler={Settings} />
	</Route>
);

Router.run(routes, Handler => {
  React.render(<Handler/>, document.body);
});

