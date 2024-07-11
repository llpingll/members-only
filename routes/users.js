const express = require("express");
const router = express.Router();

// Require controllers
const login_ontroller = require("../controllers/loginController");

// Routes
router.get("/", login_controller.signup_get);

router.post("/", login_controller.signup_post);
