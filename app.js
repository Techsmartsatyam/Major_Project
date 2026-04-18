const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const MONGO_URL="mongodb://127.0.0.1:27017/FBEND";

main().then( () =>{
    console.log("Connected to DB");
})
.catch( (err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL)
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res) => {
    res.send("Hi I'm LocalHost :");
});
// app.get("/testListing", async(req,res) => {
// let sampleListing= new Listing({
//     title:"My New Villa",
//     description:"By the beach",
//     price:1200,
//     location:"Kanpur",
//     country:"India",
// });
// try{
// await sampleListing.save()
// console.log("Data save successfully:");
// }
// catch(err){
//     console.log(err);
// }

// console.log("Sample Was saved");
// res.send("Successful testing ");
// });


// Index Route
app.get("/listings", async(req,res) => {
     const allListing = await Listing.find({});
     res.render("./listings/index.ejs",{allListing});

});

// New Route
app.get("/listings/new",(req,res) => {
    res.render("./listings/new.ejs");

});
// Show route 
app.get("/listings/:id", async(req,res) => {
    let {id} = req.params;
     const listing = await Listing.findById(id);
     res.render("listings/show.ejs",{listing});
});
// Create route
app.post("/listings",async(req,res)=> {
    // let { title, description,image,price,location,country} = req.body;
    // let listing = req.body.listing;
   const Newlisting = new Listing(req.body.listing);
   await Newlisting.save();
   res.redirect("/listings");
    console.log(listing);
});

app.listen(8080,() => {
    console.log("Server is listening to port 8080");
});