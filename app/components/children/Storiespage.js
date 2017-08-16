// Include React
var React = require("react");

// block at lower part of screen for stories and notes
var Storiespage = React.createClass({

  // handle the save story button
  handleButtonClick: function(event) {
    // var indexOfCurrentArticle = $( ".saveNews" ).index( this );
    event.preventDefault()
    var indexOfCurrentArticle = React.findDOMNode(this.data-reactid);
    console.log("got the save click");
    console.log("value - ");
    console.log(indexOfCurrentArticle);

    this.props.setTerm(indexOfCurrentArticle);
  },
 

  // Here we describe this component's render method
  render: function() {
    const clickFunction = this.handleButtonClick
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">New Stories</h3>
        </div>
        <div className="panel-body">

          {/* Here we use a map function to loop through an array in JSX */}
          {
            this.props.history.map(function(search, i) {
              return (
                <div>
                  <form onSubmit={clickFunction} >
                    <button ref={i} className="btn btn-primary saveNews" type="submit">
                      Save
                    </button>
                    <p key={i}>{search.title}</p>
                  </form>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

// end Storiespage
});

module.exports = Storiespage;
// Export the component back for use in other files
