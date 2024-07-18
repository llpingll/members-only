const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.join_get = asyncHandler(async (req, res, next) => {
  res.render("join-form", { title: "Become A Member" });
});

exports.join_post = [
  body("password")
    .trim()
    .escape()
    .custom((value) => {
      return value === process.env.SECRET;
    })
    .withMessage("Incorrect secret password"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("join-form", { errors: errors.array() });
      return;
    }

    const user = await User.findById(req.user._id).exec();
    if (!user) {
      res.status(404).render("join-form", {
        errors: ["User not found, please try again later"],
      });
      return;
    }

    user.member = true;
    user.save();
    res.redirect("/");
  }),
];
