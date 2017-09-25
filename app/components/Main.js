// Include React
var React = require("react");

var Link = require("react-router").Link;

// Include the children
var Startpage = require("./children/Startpage");
var Storiespage = require("./children/Storiespage");
var Savedpage = require("./children/Savedpage");

// the routes will be in the helpers file
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Set the initial state
  getInitialState: function() {
    console.log("in Main - get initial state");
    return { whatToDo: "", scrapedArticles: [], savedArticles: [], indexOfArticles: 0 };
  },

  // let's take a shot at getting the save click
  // componentGotSave: function() {
  //   console.log("in Main componentGotSave index of current -");
  //   this.setTerm({ Article: indexOfCurrentArticle})
  //   console.log(indexOfCurrentArticle);
  // },

  // on page load, get a set of scraped articles
  componentDidMount: function() {
    helpers.getScrape().then(function(response) {
      console.log("in main componentDidMount response");
      console.log(response);
      console.log("Article", response.data);
      console.log("this -");
      console.log(this);
      this.setState({ scrapedArticles: response.data });
    }.bind(this));
  },

  // If the component changes
  componentDidUpdate: function() {
        console.log("in main - component did update - index");
        console.log(this.state.whatToDo);
        console.log(this.state);
        if (this.state.whatToDo === "showSaved"){
            // Get saved articles
            helpers.getSavedArticles().then(function(savedArticles){
              console.log("we got the saved articles");
              console.log(savedArticles);
              console.log(savedArticles.data);
              this.setState({ savedArticles: savedArticles.data, whatToDo: "dont" })
            }.bind(this))
        } else if (this.state.whatToDo === "delete"){
            // delete article
            console.log("in main delete");
            console.log(this.state.whatToDo);
            helpers.postDeleteArticle(this.state.savedArticles[this.state.indexOfArticles]._id).then(function(){
                console.log("in main, back from the delete");
                // After we've done the post delete get the updated articles
                helpers.getSavedArticles().then(function(response) {
                  console.log("saved Articles");
                  console.log(response.data);
                  this.setState({ savedArticles: response.data, whatToDo: "done"});
                }.bind(this));
            }.bind(this));
        } else if (this.state.whatToDo === "scrapeNew"){
            // scrape new articles
            console.log("in main scrape new");
            helpers.getScrape().then(function(response){
              console.log("back from scrape");
              console.log(response.data);
              this.setState({ scrapedArticles: response.data, whatToDo: "dont" });
            }.bind(this));
        } else if (this.state.whatToDo === "saveArticle"){
            // Save an article to the database
            helpers.postIndexToSave(this.state.indexOfArticles).then(function() {
              console.log("Updated!");

                // After we've done the post... then get the updated history
                helpers.getSavedArticles().then(function(response) {
                  console.log("saved Articles");
                  console.log(response.data);
                  this.setState({ savedArticles: response.data, whatToDo: "done"});
                }.bind(this));
            }.bind(this));
        }
    //   }
    // }.bind(this));
  },
  // This function allows childrens to update the parent.
  setTerm: function(input, index) {
    console.log("in main at setTerm");
    console.log(input, index);
    console.log(this.state);
    this.setState({ whatToDo: input, indexOfArticles: index });
  },

//  the render for router
  // render(){
  //   return(
  //     <h1>Hello World</h1>
  //     <div>
  //         <Link to="/saved">Click here to save articles</Link>
  //         <Link to="/search">Click .. </Link>
  //     </div>
  //     <div>
  //       {this.props.children}
  //     </div>
  //     )
  // }
  // export default Search;




  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">Steve's Spin Scrape Mongo Database Page</h2>
          </div>

          <div className="col-md-10">
            <Startpage setTerm={this.setTerm} />
          </div>
        </div>

{/*        <div className="row">
          <Article history={this.state.history} />
        </div>
*/}
        <div className="row">
          <Storiespage setTerm={this.setTerm} articles={this.state.scrapedArticles} />
          <Savedpage setTerm={this.setTerm} savedArticles={this.state.savedArticles} />
        </div>

      </div>
    );
  },

});

// Export the component
module.exports = Main;
