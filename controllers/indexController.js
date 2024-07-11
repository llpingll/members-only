const User = require("../models/user");
const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { request } = require("express");

// INDEX
// Display signup form
exports.index = asyncHandler(async (req, res, next) => {
  res.render("index");
});

// lOGIN
// Display signup form on get
exports.signup_get = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form");
});

// Handle signup form on post
exports.signup_post = [
  // Sanitize input values
  body("firstName")
    .trim()
    .escape()
    .isLength({ min: 3, Max: 10 })
    .withMessage("First name must be between 1 and 10 characters")
    .isAlphanumeric()
    .withMessage("First name must contian alphabetical characters only")
    .toLowerCase(),
  body("lastName")
    .trim()
    .escape()
    .isLength({ min: 3, Max: 10 })
    .withMessage("First name must be between 1 and 10 characters")
    .isAlphanumeric()
    .withMessage("First name must contian alphabetical characters only")
    .toLowerCase(),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be a valid email address")
    .toLowerCase(),
  body("password")
    .trim()
    .MaxisStrongPassword({
      minlength: 8,
      minSymbols: 1,
    })
    .withMessage(
      "password must be at least 8 characters long and conain at least 1 special character"
    ),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Rerender form with sanitized values if validation errors exist
    if (errors) {
      res.render("sign-up-form", {
        firstname: req.body.firstname,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        errors: errors.array(),
      });
      return;
    }

    // Create user
    const user = new User({
      firstname: req.body.firstname,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    // Check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.render("sign-up-form", {
        firstname: req.body.firstname,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        errors: [
          `User with email: ${req.body.email} already exists, please login`,
        ],
      });
      return;
    }

    // Save user to database
    await user.save();
    res.redirect("/");
  }),
];
