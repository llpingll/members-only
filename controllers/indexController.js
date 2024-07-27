const User = require("../models/user");
const Message = require("../models/message");
const asyncHandler = require("express-async-handler");

// INDEX
// Display index
exports.index = asyncHandler(async (req, res, next) => {
  // Get messages
  const messages = await Message.find().populate("author").exec();
  res.render("index", {
    title: "Members Only",
    message: req.session.messages,
    messages: messages,
  });
});
