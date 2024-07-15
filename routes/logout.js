const express = require("express");
const router = express.Router();

// Handle logout
router.get("/", (req, res, next) => {
  console.log("Logout");
  req.logout((err) => {
    if (err) {
      next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
