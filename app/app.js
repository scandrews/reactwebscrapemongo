// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");

var routes = require("./config/routes");

// Include Main
// var Main = require("./components/Main");

// Render the main component
// ReactDOM.render(<Main />, document.getElementById("app"));
ReactDOM.render(routes, document.getElementById("app"));
