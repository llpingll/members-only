const express = require("express");
const router = express.Router();

// Require controllers
const user_controller = require("../controllers/signupController");

// Routes
router.get("/", user_controller.signup_get);

router.post("/", user_controller.signup_post);

module.exports = router;
