const express = require("express");
const router = express.Router();
const passport = require("passport");

// Routes
// Handle authetication on login
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  })
);

module.exports = router;
