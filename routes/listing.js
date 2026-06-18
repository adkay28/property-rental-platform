const express = require("express");
const Listing = require("../models/listings.js");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

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
router.get("/new", (req, res) => {
  res.render("listings/newListing.ejs");
});

//show route(view in detail)
router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");
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
  validateListing,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    //another way:
    //const newListing = new Listing(req.body.listing);
    console.log(newListing);
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
  }),
);

//edit route(render a form)
router.get(
  "/:id/edit",
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
