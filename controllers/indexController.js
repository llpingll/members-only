const User = require("../models/user");
const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// INDEX
// Display index
exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "Members Only", user: req.user });
});
