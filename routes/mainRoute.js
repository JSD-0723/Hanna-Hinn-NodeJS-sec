// Imports
const express = require("express");

// Defining Router
const router = express.Router();

// / --> GET --> return the main pug file
router.get("/", (req, res, next) => {
  res.render("main", { pageTitle: "Shop", path: "/" });
});

// Exports
exports.routes = router;
