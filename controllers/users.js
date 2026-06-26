const User = require("../models/user.js");

module.exports.signUpForm = (req, res) => {
  res.render("./users/signup.ejs");
};

module.exports.signUpUser = async (req, res) => {
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
};

module.exports.loginForm = (req, res) => {
  res.render("./users/login.ejs");
};

module.exports.loginUser = async (req, res) => {
  req.flash("success", "Welcome Back!");
  if (res.locals.orgUrl) res.redirect(res.locals.orgUrl);
  else res.redirect("/listings");
};

module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have successfully logged out");
    res.redirect("/");
  });
};
