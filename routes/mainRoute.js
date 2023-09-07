const express = require("express");

const router = express.Router();

// / --> GET --> return the main pug file
router.get("/", (req, res, next) => {
  res.render("main", { pageTitle: "Shop", path: "/" });
});

exports.routes = router;