var express = require("express");
var path = require("path");
var http = require("http");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var entries = [];              // create global array to store all your entries
app.locals.entries = entries;  // makes this entries array available in all views

app.use(logger("dev"));        // use Morgan to log every request

app.use(bodyParser.urlencoded({ extended: false})); // populates a variable called req.body if the user is submitting a form

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/new-entry", function(req, res) {
  res.render("new-entry");
});

app.post("/new-entry", function(req, res) {
  if (!req.body.title || !req.body.body) {
    res.status(404).send("Entries must have a title and a body.");
    return;
  }
  entries.push({
    title: req.body.title,
    content: req.body.body,
    published: new Date()
  });
  res.redirect("/");
});

app.use(function(req, res) {
  res.status(404).render("404");
})

http.createServer(app).listen(3000, function() {
  console.log("Guestbook app started on port 3000.");
})
