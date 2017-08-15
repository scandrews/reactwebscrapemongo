// Include React
var React = require("react");

// block at lower part of screen for stories and notes
var Storiespage = React.createClass({

  // handle the save story button
  handleButtonClick: function(event) {
    console.log("got the save click");
    // var indexOfCurrentArticle = $( ".saveNews" ).index( this );
    console.log("value - ");
    console.log(indexOfCurrentArticle);

    // this.props.setIndex(indexOfCurrentArticle);
  },
 

  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">New Stories</h3>
        </div>
        <div className="panel-body">
                <p key={i}>{<button onSubmit={this.handleButtonClick} className="btn btn-primary saveNews" type="submit">
                    Save
                  </button>}george</p>

            );
          {/* Here we use a map function to loop through an array in JSX */}
          {this.props.history.map(function(search, i) {
            return (
              // <form onSubmit={this.handleButtonClick} >
              // </form>
          })}
        </div>
      </div>
    );
  }

// end Storiespage
});

module.exports = Storiespage;
// Export the component back for use in other files
