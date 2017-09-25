var React = require("react");

var router = require("react-router");
var Route = router.Route;
var Router = router.Router;
var IndexRoute = router.IndexRoute
var browserHistory = router.browserHistory;
var Main = require("../components/Main");
var Saved = require("../components/children/Savedpage");
var Start = require("../components/children/Startpage");
var Stories = require("../components/children/Storiespage");


module.exports =  (
	<Router history = {browserHistory}>
		<Route path = "/" component={Main}>
			<Route path = "Saved" component={Saved} />
			<Route path = "Start" component={Start} />
			<IndexRoute component={Stories} />
		</Route>
	</Router>
);
