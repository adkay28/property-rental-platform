const Listing = require("./models/listings.js");
const Review = require("./models/reviews.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectedUrl = req.originalUrl;
    req.flash("error", "You must be Logged in");
    return res.redirect("/login");
  }
  next();
};

saveOrgUrl = (req, res, next) => {
  if (req.session.redirectedUrl) {
    res.locals.orgUrl = req.session.redirectedUrl;
  }
  next();
};

isOwner = async (req, res, next) => {
  let { id } = req.params;
  let currListing = await Listing.findById(id);
  if (!currListing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have Permission to make Changes");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    console.log(error.details);
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

isReviewAuthor = async (req, res, next) => {
  console.log(req.params);
  let { id, reviewId } = req.params;
  let currReview = await Review.findById(reviewId);
  if (!currReview.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have Permission to make Changes");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports = {
  isLoggedIn,
  saveOrgUrl,
  isOwner,
  validateListing,
  validateReview,
  isReviewAuthor,
};
