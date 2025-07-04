const mongoose = require("mongoose");
let iData = require("./data.js");
const Listing = require("../models/listing.js");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Airbnb');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const initDb = async () => {
    await Listing.deleteMany({});
    iData.data =iData.data.map((obj)=>({...obj,owner:"68614b74f8eba14142188aa8"}));
    await Listing.insertMany(iData.data);
    console.log("success");
}
initDb();




