// Include axios
var axios = require("axios");

// Helper functions for making API Calls
var helper = {

	// This route gets the scraped articles
	getScrape: function() {
		return axios.get("/api");
	},

	// This function posts new articles to save to the database.
	postIndexToSave: function(articleIndex) {
		console.log("in helpers post Index to save");
		console.log(articleIndex);
		return axios.post("/api", { articleIndex: articleIndex });
	},

	getSavedArticles(saved){
		console.log("in helpers - get saved articles");
		return axios.get("/saved");
	},

	postDeleteArticle(deleteId){
		console.log("in helpers - post delete articles");
		console.log(deleteId);
		return axios.post("/delete", { deleteIndex: deleteId });
	}

// end helper
};

// We export the API helper
module.exports = helper;
