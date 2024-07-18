const express = require("express");
const router = express.Router();

const join_controller = require("../controllers/joinController");

// Routers
// Display join form on get
router.get("/", join_controller.join_get);

// Handle join form submission
router.post("/", join_controller.join_post);

module.exports = router;
