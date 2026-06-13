const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  console.log("home directory is working!");
  res.send("home directory");
});

//index route(view)
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/listings.ejs", { allListings });
  }),
);

//create route(render a form)
app.get("/listings/new", (req, res) => {
  res.render("listings/newListing.ejs");
});

//show route(view in detail)
app.get(
  "/listings/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
      next(new ExpressError(400, "enter valid ID"));
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
  }),
);

//create route(add to DB)
app.post(
  "/listings",
  validateListing,
  wrapAsync(async (req, res, next) => {
    let result = listingSchema.validate(req.body);
    console.log(result);
    if (result.error) {
      throw new ExpressError(400, result.error);
    }
    let { title, description, price, image, location, country } = req.body;
    const newListing = new Listing({
      title: title,
      description: description,
      price: price,
      image: image,
      location: location,
      country: country,
    });
    //another way:
    //const newListing = new Listing(req.body.listing);
    console.log(newListing);
    await newListing.save();
    res.redirect("/listings");
  }),
);

//edit route(render a form)
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  }),
);

//update route(change in DB)
app.put(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { title, description, price, image, location, country } = req.body;
    await Listing.findByIdAndUpdate(id, {
      title: title,
      description: description,
      price: price,
      image: image,
      location: location,
      country: country,
    });
    res.redirect(`/listings/${id}`);
  }),
);

//destroy route
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  }),
);

//for all other routes : send 404 error
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "something went wrong" } = err;
  res.status(status).render("listings/error.ejs", { message });
});

app.listen(8080, () => {
  console.log("listening to port 8080");
});
