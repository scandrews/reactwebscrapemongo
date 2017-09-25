// Include React
var React = require("react");

// block at lower part of screen for saved stories and notes
var Savedpage = React.createClass({

  // handle the save story button
  handleButtonClick: function(event) {
    // var indexOfCurrentArticle = $( ".saveNews" ).index( this );
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
    console.log("got the delete click");
    console.log("value - " + indexOfCurrentArticle);
    console.log(this.props);
    this.props.setTerm("delete", indexOfCurrentArticle);
  },
 

  // Here is component render method
  render: function() {
    console.log("in Savedpage render");
    console.log(this.props.savedArticles);
    if(this.props.savedArticles.length > 0){
        console.log(this.props.savedArticles);
        console.log("clearly");
        // console.log(this.props.savedArticles[0].title);
        const clickFunction = this.handleButtonClick;
        return (
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title text-center">Saved Articles</h3>
            </div>
            <div className="panel-body">

              {
                this.props.savedArticles.map(function(search, i) {
                  return (
                    <div key={i}>
                      <form onSubmit={clickFunction} >
                        <p><button ref={i} className="btn btn-primary saveNews" type="submit">
                          Delete
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
                  console.log("just finished the map");
    } else {
          console.log("no saved articles to render");
          return (
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">No Saved Articles</h3>
              </div>
            </div>
          )
    }

// end render
  }

// end Savedpage
});

// Export the component for use in other files
module.exports = Savedpage;
