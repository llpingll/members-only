const express = require("express");
const router = express.Router();
const passport = require("passport");
const login_controller = require("../controllers/loginController");

// Routes
// Get login form on login get
router.get("/", login_controller.login_get);

// Handle authetication on login
router.post("/", passport.authenticate("local", login_controller.login_post));

module.exports = router;
