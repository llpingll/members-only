const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const user = await User.findOne({ email: username }).exec();
        req.session.messages = [];
        if (!user) {
          return done(null, false, {
            message: "Username and password don't match or don't exist",
          });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, {
            message: "Username and password don't match or don't exist",
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

const initializeAuth = (app) => {
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.urlencoded({ extended: false }));

  // Make current logged in user available to all views
  app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });
};

module.exports = initializeAuth;
