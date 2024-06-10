const express = require("express");

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Users route");
});

module.exports = router;
