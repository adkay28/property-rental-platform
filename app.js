if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");
const Review = require("./models/reviews.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js"); //validation
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const flash = require("connect-flash");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("./models/user.js");
const usersRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
}

const store = mongoStore.create({
  mongoUrl: process.env.ATLASDB_URL,
  touchAfter: 24 * 60 * 60,
});

store.on("error", (err) => {
  console.log("error in mongo session store", err);
});

const sessionOptions = {
  store: store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.get("/", (req, res) => {
  return res.render("homepage.ejs");
});

app.use("/listings", listingsRouter); //for all listing requests
app.use("/listings/:id/reviews", reviewsRouter); //for all review requests
app.use("/", usersRouter);

//for all other routes : send 404 error
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  console.log("CRASH DETECTED:", err);
  let { status = 500, message = "something went wrong" } = err;
  const displayMessage =
    typeof message === "object" ? JSON.stringify(message) : message;
  res.status(status).render("listings/error.ejs", { message });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("listening to port");
});
