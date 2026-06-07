const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.listen(8080, ()=>{
    console.log("listening to port 8080");
})

main()
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    })
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.get("/", (req, res)=>{
    console.log("home directory is working!");
    res.send("home directory");
});

//index route(view)
app.get("/listings", async (req, res)=>{
    const allListings = await Listing.find({});
    res.render("listings/listings.ejs", {allListings});
});

//create route(render a form)
app.get("/listings/new", (req, res)=>{
    res.render("listings/newListing.ejs");
});

//show route(view in detail)
app.get("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    console.log(listing);
    res.render("listings/show.ejs", {listing});
})

//create route(add to DB)
app.post("/listings", async (req, res)=>{
    let {title, description, price, image, location, country} = req.body;
    const newListing = new Listing({
        title: title,
        description: description,
        price: price,
        image: image,
        location: location,
        country: country
    })
    //another way: 
    //const newListing = new Listing(req.body.listing);
    console.log(newListing);
    newListing.save();
    res.redirect("/listings");
});

//edit route(render a form)
app.get("/listings/:id/edit", async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

//update route(change in DB)
app.put("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    let {title, description, price, image, location, country} = req.body;
    await Listing.findByIdAndUpdate(id, {
        title: title,
        description: description,
        price: price,
        image: image,
        location: location,
        country: country
    });
    res.redirect(`/listings/${id}`);
});

//destroy route
app.delete("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});
