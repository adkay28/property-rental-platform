const Listing = require("../models/listings.js");
const Review = require("../models/reviews.js");

module.exports.addReview = async (req, res) => {
  let { id } = req.params;
  let { body, rating } = req.body.review;
  console.log(body, rating);
  const newReview = new Review({
    body: body,
    rating: rating,
  });
  newReview.author = req.user._id;
  await newReview.save();
  let currListing = await Listing.findById(id);
  currListing.reviews.push(newReview);
  await currListing.save();
  req.flash("success", "New review added!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted!");
  res.redirect(`/listings/${id}`);
};
