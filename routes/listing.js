const express = require("express");
const Listing = require("../models/listings.js");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {
  isLoggedIn,
  saveOrgUrl,
  isOwner,
  validateListing,
} = require("../middleware.js");

//Listings
//index route(view)
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/listings.ejs", { allListings });
  }),
);

//create route(render a form)
router.get("/new", isLoggedIn, (req, res) => {
  console.log(req.user);
  res.render("listings/newListing.ejs");
});

//show route(view in detail)
router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })  //populate reviews with the author field(nested populate)
      .populate("owner");
    if (!listing) {
      // return next(new ExpressError(400, "enter valid ID"));
      req.flash("error", "Requested Listing does not exist");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  }),
);

//create route(add to DB)
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    //another way:
    //const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    console.log(newListing);
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
  }),
);

//edit route(render a form)
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Requested Listing does not exist");
      return res.redirect(`/listings/${id}`);
    }
    res.render("listings/edit.ejs", { listing });
  }),
);

//update route(change in DB)
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { listing } = req.body;
    await Listing.findByIdAndUpdate(id, listing);
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
  }),
);

//destroy route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
      req.flash("error", "Requested Listing does not exist");
      return res.redirect(`/listings`);
    }
    console.log(deletedListing);
    req.flash("success", "Listing deleted!");
    res.redirect(`/listings`);
  }),
);

module.exports = router;
