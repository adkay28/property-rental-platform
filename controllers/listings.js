const Listing = require("../models/listings.js");
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAP_API_KEY;

module.exports.index = async (req, res) => {
  const { location } = req.query;
  let allListings;
  if (location) {
    allListings = await Listing.find({
      location: { $regex: location, $options: "i" },
    });
    if (allListings.length) {
      return res.render("listings/listings.ejs", { allListings });
    }
    req.flash("error", `No Listing Found for "${location}"`);
    return res.redirect("/listings");
  }
  allListings = await Listing.find({});
  return res.render("listings/listings.ejs", { allListings });
};

module.exports.newListingForm = (req, res) => {
  console.log(req.user);
  res.render("listings/newListing.ejs");
};

module.exports.viewListing = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } }) //populate reviews with the author field(nested populate)
    .populate("owner");
  if (!listing) {
    // return next(new ExpressError(400, "enter valid ID"));
    req.flash("error", "Requested Listing does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", {
    listing: listing,
    MAP_API_KEY: process.env.MAP_API_KEY,
  });
};

module.exports.addListingtoDB = async (req, res, next) => {
  let response = await maptilerClient.geocoding.forward(
    req.body.listing.location,
    { limit: 1 },
  );

  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  console.log(newListing);
  newListing.geometry = response.features[0].geometry;

  await newListing.save();
  req.flash("success", "New listing created!");
  res.redirect("/listings");
};

module.exports.editListingForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Requested Listing does not exist");
    return res.redirect(`/listings/${id}`);
  }
  let orgUrl = listing.image.url;
  listing.image.url = orgUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing });
};

module.exports.updateinDB = async (req, res) => {
  let { id } = req.params;
  let newListing = await Listing.findByIdAndUpdate(id, req.body.listing);
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    newListing.image = { url, filename };
    await newListing.save();
  }
  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) {
    req.flash("error", "Requested Listing does not exist");
    return res.redirect(`/listings`);
  }
  console.log(deletedListing);
  req.flash("success", "Listing deleted!");
  res.redirect(`/listings`);
};
