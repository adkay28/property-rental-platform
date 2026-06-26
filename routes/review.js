const express = require("express");
const Listing = require("../models/listings.js");
const Review = require("../models/reviews.js");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isReviewAuthor } = require("../middleware.js");
const ReviewController = require("../controllers/reviews.js");

//add review
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(ReviewController.addReview),
);

//delete review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(ReviewController.deleteReview),
);

module.exports = router;
