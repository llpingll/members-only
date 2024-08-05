const User = require("../models/user");
const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// SIGNUP
// Display signup form on get
exports.signup_get = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form", { title: "Sign-up" });
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
    .withMessage("Last name must be between 1 and 10 characters")
    .isAlphanumeric()
    .withMessage("Last name must contian alphabetical characters only")
    .toLowerCase(),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be a valid email address")
    .toLowerCase(),
  body("password")
    .trim()
    .isStrongPassword({
      minlength: 8,
      minSymbols: 1,
    })
    .withMessage(
      "password must be at least 8 characters long and conain at least 1 special character"
    ),
  body("confirmPassword")
    .trim()
    .escape()
    .custom((value, { req }) => {
      console.log("value =" + value);
      return value === req.body.password;
    })
    .withMessage("Confirmation does not match password"),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Rerender form with sanitized values if validation errors exist
    if (!errors.isEmpty()) {
      console.log(`rerender ${errors}`);
      res.render("sign-up-form", {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        errors: errors.array(),
      });
      return;
    }

    // Create user
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    // Check if user already exists
    const userExists = await User.findOne({ email: req.body.email }).exec();
    if (userExists) {
      res.render("sign-up-form", {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        errors: [
          `User with email: ${req.body.email} already exists, please login`,
        ],
      });
      return;
    }

    //Hash plaintext password
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      // if err, rerender form
      if (err) {
        res.render("sign-up-form", {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          errors: [`hash error: ${err}`],
        });
        return;
      }
      // otherwise, store hashedPassword
      user.password = hashedPassword;
      // Save user to database
      await user.save();
      console.log("Created");
      res.render("index", { title: "Sign-up" });
    });
  }),
];
