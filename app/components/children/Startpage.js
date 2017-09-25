// Include React
var React = require("react");
var Link = require("react-router").Link;

// object to export
var Startpage = React.createClass({

  // Set the initial state
  getInitialState: function() {
    console.log("In start page get initial state");
    return { term: "" };
  },

  // handle user input
  handleChange: function(event) {
    console.log("in start page - handle change");
    this.setState({ term: event.target.value });
  },

  // handle show saved articles
  handleShowSaved: function() {
    console.log("in startpage handle show saved");
    // Set the parent to have the search term
    this.props.setTerm("showSaved", 0);
    console.log("between the two sets in handle show saved");
  },
  
  // handle the scrape new button
  handleScrapeNew: function(event) {
    console.log("in start page, handle scrape new");
    // Set the parent to have the search term
    this.props.setTerm( "scrapeNew", 0 );
  },
  
  // Here is the component render method
  render: function() {
    console.log("In start page render");
    console.log(this);
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">What would you like to do?</h3>
        </div>
        <div className="panel-body text-center">
          <div className="row">

              <p>
                <button onClick={this.handleScrapeNew} className="btn btn-primary btn-lg">Scrape New Stories</button>
                <button onClick={this.handleShowSaved} className="btn btn-primary btn-lg">Show Saved Stories</button>
              </p>

          </div>

        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Startpage;

            // <form onSubmit={this.handleScrapeNew}>
            //   <div className="form-group">
            //     <button
            //       className="btn btn-primary" type="submit">
            //       Scrape New Stories
            //     </button>
            //   </div>
            // </form>
            // <form onSubmit={this.handleShowSaved}>
            //   <div className="form-group">
            //     <button
            //       className="btn btn-primary" type="submit">
            //       Show Saved Stories
            //     </button>
            //   </div>
            // </form>
