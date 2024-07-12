const express = require("express");
const router = express.Router();

// Require controllers
const login_controller = require("../controllers/indexController");

// Routes
router.get("/", login_controller.signup_get);

router.post("/", login_controller.signup_post);

module.exports = router;
