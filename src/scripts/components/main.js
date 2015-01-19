var App = require("./App");
var Index = require("./Index");
var Settings = require("./Settings");
var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
	<Route handler={App}>
		<Route handler={Index}>
			<Route name="settings" path="/settings" handler={Settings} />
		</Route>
	</Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
