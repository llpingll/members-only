const express = require("express");
const router = express.Router();

// Require controllers
const message_controller = require("../controllers/messageController");

// Routes
router.get("/", message_controller.message_get);

router.post("/", message_controller.message_post);

module.exports = router;
