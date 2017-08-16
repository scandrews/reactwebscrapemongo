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
// Sets an initial port. We'll use this later in our listener
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

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get("/api", function(req, res) {
    console.log("we got the get/api do a scrape");
    // get the HTML body from the spin.com
    request("http://www.spin.com", function(error, response, html) {
      // Load into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
      var $ = cheerio.load(html);
      // clear the array before we load new articles
      arrayOfArticles = [];
      // Select each element in the HTML body
      $(".preview-holder").each(function(i, element) {

        var link = $(element).children().attr("href");
        var title = $(element).children("a").text();

        // Save to an object and push an array
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


    // We will find all the records, sort it in descending order, then limit the records to 5
    // Article.find({}).sort([
    //   ["date", "descending"]
    // ]).limit(5).exec(function(err, doc) {
    //   if (err) {
    //     console.log(err);
    //   }
    //   else {
    //     res.send(doc);
    //   }
    // });
});

// This is the route we will send POST requests to save each search.
app.post("/api", function(req, res) {
  console.log("BODY: " + req.body.location);

  // Here we'll save the location based on the JSON input.
  // We'll use Date.now() to always get the current date time
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
