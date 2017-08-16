// Include axios
var axios = require("axios");

// Helper functions for making API Calls
var helper = {

  // This route gets the scraped articles
  getScrape: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postIndexToSave: function(location) {
    return axios.post("/api", { location: location });
  }
};

// We export the API helper
module.exports = helper;
