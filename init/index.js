const mongoose = require("mongoose");
const Listing = require("../models/listings.js");
const initData = require("./data.js");
if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: "../.env" });
}

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

const initDB = async (initData) => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6a359ee92d6970da87a1905c",
  }));
  await Listing.insertMany(initData.data);
  console.log("initialisation of DB is completed");
};

initDB(initData);
