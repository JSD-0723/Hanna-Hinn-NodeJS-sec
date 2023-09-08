// Imports
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// defining the port for the application to listen
const port = 3000;

// defining the template engine for the application
app.set("view engine", "pug");
// defining the views file for the template engine
app.set("views", "views");

// Local (files) imports
const rootDir = require("./util/path");
const bookData = require("./routes/books");
const mainRoute = require("./routes/mainRoute");

// Added Application Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

// defining the routes for the application
app.use(bookData.routes);
app.use(mainRoute.routes);

// return 404 for all unRegistered routes
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page not found" });
});

app.listen(port);
