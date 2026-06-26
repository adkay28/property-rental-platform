const express = require("express");
const Listing = require("../models/listings.js");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ListingController = require("../controllers/listings.js");
const {
  isLoggedIn,
  saveOrgUrl,
  isOwner,
  validateListing,
} = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(ListingController.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(ListingController.addListingtoDB),
  );

router.get("/new", isLoggedIn, ListingController.newListingForm);

router
  .route("/:id")
  .get(wrapAsync(ListingController.viewListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(ListingController.updateinDB),
  )
  .delete(isLoggedIn, isOwner, wrapAsync(ListingController.deleteListing));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.editListingForm),
);

module.exports = router;
