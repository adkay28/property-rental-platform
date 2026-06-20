const express = require("express");
const Listing = require("../models/listings.js");
const User = require("../models/user.js");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const passport = require("passport");
const { isLoggedIn, saveOrgUrl } = require("../middleware.js");

router.get("/signup", (req, res) => {
  res.render("./users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({
        username: username,
        email: email,
      });
      let registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "You have signed up!");
        res.redirect("/listings");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  }),
);

router.get("/login", (req, res) => {
  res.render("./users/login.ejs");
});

router.post(
  "/login",
  saveOrgUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome Back!");
    if (res.locals.orgUrl) res.redirect(res.locals.orgUrl);
    else res.redirect("/listings");
  },
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have successfully logged out");
    res.redirect("/listings");
  });
});

module.exports = router;
