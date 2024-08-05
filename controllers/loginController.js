const asyncHandler = require("express-async-handler");

exports.login_get = asyncHandler(async (req, res, next) => {
  res.render("login-form", { errors: req.session.messages });
});

exports.login_post = {
  successRedirect: "/",
  failureRedirect: "/login",
  failureMessage: true,
};
