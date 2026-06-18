const express = require("express");
const Listing = require("../models/listings.js");
const Review = require("../models/reviews.js");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    console.log(error.details);
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//add review
router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { body, rating } = req.body.review;
    console.log(body, rating);
    const newReview = new Review({
      body: body,
      rating: rating,
    });
    await newReview.save();
    let currListing = await Listing.findById(id);
    currListing.reviews.push(newReview);
    await currListing.save();
    req.flash("success", "New review added!");
    res.redirect(`/listings/${id}`);
  }),
);

//delete review
router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
  }),
);

module.exports = router;
