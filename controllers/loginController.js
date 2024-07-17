const asyncHandler = require("express-async-handler");

exports.login_get = asyncHandler(async (req, res, next) => {
  res.render("login-form", { title: "Log In" });
});

exports.login_post = {
  successRedirect: "/",
  failureRedirect: "/login",
  failureMessage: true,
};
