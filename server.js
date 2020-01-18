// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// #### Dependencies
// ==============================================================================
require("dotenv").config();
var express = require("express");
// var exphbs = require("express-handlebars");

// #### Requiring models for syncing
// ==============================================================================
var db = require("./models");

// #### Express app
// ==============================================================================
var app = express();
var PORT = process.env.PORT || 8080;

// #### Express app tp handle dara parsing
// ==============================================================================
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));


// #### Handlebars
// ==============================================================================
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main"
//   })
// );
// app.set("view engine", "handlebars");


// #### Routes
// ==============================================================================
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log("Listening on PORT: " + PORT);
  });
});

module.exports = app;
