const express = require("express");
const Listing = require("../models/listings.js");
const User = require("../models/user.js");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const passport = require("passport");
const { isLoggedIn, saveOrgUrl } = require("../middleware.js");
const {
  signUpUser,
  signUpForm,
  loginForm,
  loginUser,
  logoutUser,
} = require("../controllers/users.js");

router.route("/signup").get(signUpForm).post(wrapAsync(signUpUser));

router
  .route("/login")
  .get(loginForm)
  .post(
    saveOrgUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    loginUser,
  );

router.get("/logout", logoutUser);

module.exports = router;
