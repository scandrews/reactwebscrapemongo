// Include React
var React = require("react");

// Include the children
var Form = require("./children/Startpage");
var Article = require("./children/Storiespage");

// the routes will be in the helpers file
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Set the initial state
  getInitialState: function() {
    return { searchTerm: "", results: "", history: [] };
  },

  // let's take a shot at getting the save click
  componentGotSave: function() {
    this.setTerm({ Article: indexOfCurrentArticle})
    console.log("in Main componentGotSave index of current -");
    console.log(indexOfCurrentArticle);
  },


  // on page load, get a set of scraped articles
  componentDidMount: function() {
    helpers.getScrape().then(function(response) {
      console.log("in main componentDidMount response");
      console.log(response);
      if (response !== this.state.history) {
        console.log("Article", response.data);
        this.setState({ history: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {

        console.log("in main - component did update - index");
        console.log(this.state.searchTerm);
        // this.setState({ results: data });

        // After we've received the result... then post the search term to our history.
        helpers.postIndexToSave(this.state.searchTerm).then(function() {
          console.log("Updated!");

          // After we've done the post... then get the updated history
          helpers.getHistory().then(function(response) {
            console.log("Current Article", response.data);

            console.log("my new Article", response.data);

            this.setState({ history: response.data });

          }.bind(this));
        }.bind(this));
    //   }
    // }.bind(this));
  },
  // This function allows childrens to update the parent.
  setTerm: function(term) {
    console.log("in main at setTerm");
    this.setState({ searchTerm: term });
  },
  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">Steve's Spin Scrape Mongo Database Page</h2>
          </div>

          <div className="col-md-10">
            <Form setTerm={this.setTerm} />
          </div>


        </div>

        <div className="row">
          <Article history={this.state.history} />
        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
