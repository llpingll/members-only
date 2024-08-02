const User = require("../models/user");
const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { localsName } = require("ejs");

// Display signup form on get
exports.message_get = asyncHandler(async (req, res, next) => {
  if (req.user) {
    res.render("message-form");
    return;
  }
  res.redirect("/");
  // res.render("message-form");
});

exports.message_post = [
  // Sanitize input values
  body("title")
    .trim()
    .escape()
    .isLength({ min: 3, max: 15 })
    .withMessage("Title must be between 3 and 15 characters")
    .isAlphanumeric()
    .withMessage("Title name must contian alphabetical characters only"),
  body("content")
    .trim()
    .isLength({ min: 3, max: 500 })
    .withMessage("Message name must be between 3 and 500 characters")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Message must contian alphabetical characters only")
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Rerender form with sanitized values if validation errors exist
    if (!errors.isEmpty()) {
      console.log(`rerender ${errors}`);
      res.render("message-form", {
        title: req.body.title,
        content: req.body.content,
        errors: errors.array(),
      });
      return;
    }

    // Create user
    const message = new Message({
      title: req.body.title,
      content: req.body.content,
      author: req.user._id,
      date: new Date(),
    });

    //Hash plaintext password
    await message.save();
    console.log("Created");
    res.redirect("/");
  }),
];
