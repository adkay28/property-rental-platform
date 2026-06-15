const mongoose = require("mongoose");
const { Schema } = mongoose.Schema;
const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1709065660550-7b473317a9af?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : v,
    default:
      "https://images.unsplash.com/photo-1709065660550-7b473317a9af?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectID,
      ref: "Review",
    },
  ],
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
