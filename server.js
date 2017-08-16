// Homework 17 react based web scrape mongo - server
// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Article Schema
var Article = require("./models/Article");

// for the scraper
var cheerio = require("cheerio");
var request = require("request");

// Create Instance of Express
var app = express();
// Sets the port
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// -------------------------------------------------

// MongoDB configuration
mongoose.connect("mongodb://localhost/reactwebscrapemongoose");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// global variable for the scaraped unsaved articles
var arrayOfArticles = [];


// -------------------------------------------------

// Main Route
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// route to scrape new articles
app.get("/api", function(req, res) {
    console.log("we got the get/api do a scrape");
    // get the HTML body from the spin.com
    request("http://www.spin.com", function(error, response, html) {
      // Load into cheerio and save it to a variable
      var $ = cheerio.load(html);
      // clear the array before we load new articles
      arrayOfArticles = [];
      // Select each element in the HTML body
      $(".preview-holder").each(function(i, element) {

        var link = $(element).children().attr("href");
        var title = $(element).children("a").text();

        // Save to an object and push an array
        // the key will be used to reference the article
        arrayOfArticles.push({
          title: title,
          link: link,
          key: i
        });
      });

      // Log the arrayOfArticles
      console.log(arrayOfArticles);
      res.send(arrayOfArticles);
    });
});

// This route handles requests to save an article
app.post("/api", function(req, res) {
  console.log("BODY: " + req.body.location);

  // Save the article based using the index returned from the click
  Article.create({
    title: arrayOfArticles[req.body.location].title,
    link: arrayOfArticles[req.body.location].link,
    date: Date.now()
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Search");
    }
  });
});

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
