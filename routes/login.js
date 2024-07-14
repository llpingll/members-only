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
  })
);

// Handle logout
router.post("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
