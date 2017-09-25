// Include React
var React = require("react");

// block at lower part of screen for scraped stories
var Storiespage = React.createClass({

  // handle the save story button
  handleButtonClick: function(event) {
    // var indexOfCurrentArticle = $( ".saveNews" ).index( this );
    console.log("got the save click");
    event.preventDefault()
    console.log(event.dispatchMarker);

    var indexOfCurrentArticle = event.dispatchMarker.split(".");
    var indexOfCurrentArticle = indexOfCurrentArticle[5];
    // remove leading $ if there
    if (indexOfCurrentArticle.substring(0, 1) == '$') { 
      indexOfCurrentArticle = indexOfCurrentArticle.substring(1);
    };
    // indexOfCurrentArticle = indexOfCurrentArticle.split(".");
    // var indexOfCurrentArticle = React.findDOMNode(this.data-reactid);
    console.log("value - " + indexOfCurrentArticle);
    console.log(this.props);
    this.props.setTerm( "saveArticle", indexOfCurrentArticle);
  },
 

  // Here we describe this component's render method
  render: function() {
    console.log("in Storiespage render");
    console.log(this);
    const clickFunction = this.handleButtonClick
    if (this.props.articles.length > 0){
        console.log("got the this");
        console.log(this);
        return (
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title text-center">New Stories</h3>
            </div>
            <div className="panel-body">

              {/* Here we use a map function to loop through an array in JSX */}
              {
                this.props.articles.map(function(search, i) {
                  return (
                    <div key={i}>
                      <form onSubmit={clickFunction} >
                        <p><button ref={i} className="btn btn-primary saveNews" type="submit">
                          Save
                          </button>
                          {search.title}
                        </p>
                      </form>
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
    } else {
        console.log("nothing to render");
        return (
          <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">No New Stories</h3>
              </div>
          </div>
        )
    }
  }

// end Storiespage
});

// Export the component for use in other files
module.exports = Storiespage;
