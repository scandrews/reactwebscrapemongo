// Include React
var React = require("react");

// object to export
var Startpage = React.createClass({

  // Set the initial state
  getInitialState: function() {
    return { term: "" };
  },

  // handle user input
  handleChange: function(event) {
    this.setState({ term: event.target.value });
  },

  // handle scrape new
  handleShowSaved: function(event) {
    // Set the parent to have the search term
    this.props.setTerm(this.state.term);
    this.setState({ term: "" });
  },
  
// When a user submits...
  handleScrapeNew: function(event) {
    console.log("in forms, handleShowNotes");
    // Set the parent to have the search term
    this.props.setTerm(this.state.term);
    this.setState({ term: "" });
  },
  
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">What would you like to do?</h3>
        </div>
        <div className="panel-body text-center">
          <div className="row">
            <form onSubmit={this.handleScrapeNew}>
              <div className="form-group">
                <button
                  className="btn btn-primary" type="submit">
                  Scrape New Stories
                </button>
              </div>
            </form>
            <form onSubmit={this.handleShowSaved}>
              <div className="form-group">
                <button
                  className="btn btn-primary" type="submit">
                  Show Saved Stories
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Startpage;
