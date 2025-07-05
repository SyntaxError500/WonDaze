
const Listing = require("../models/listing");
const forwardGeocode = require("../map.js");
//home function
module.exports.home = async (req, res) => {
    let data = await Listing.find();
    res.render("./listings/home.ejs", { data });
}
//new function
module.exports.new = (req, res) => {
    res.render("./listings/new.ejs");
}

//show Function
module.exports.show =  async (req, res) => {
    let { id } = req.params;
    const card = await Listing.findById(id)
    .populate({
        path: 'reviews',
        populate: {
            path: 'author',
        }
    })
    .populate('owner');
    if(!card){
         req.flash("Error","Something Went Wrong!!!");
    }
    // console.log(card.image.url);
    res.render("./listings/show.ejs", { card });
    // console.log(card.reviews); 

}

//create function 

module.exports.create =  async (req, res) => {
    let url =  req.file.path;
    let filename =  req.file.filename;
    let list = new Listing(req.body.listing);
    list.owner = req.user._id;
    list.image = {url,filename};
    list.geometry  = await forwardGeocode(req.body.listing.location)
    await list.save();
    console.log(list);
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
}


//edit function 
module.exports.edit = async (req, res) => {
    let { id } = req.params;
    const card = await Listing.findById(id);
    res.render("./listings/edit.ejs", { card });
}

//update function
module.exports.update = async (req, res) => {
    
    let { id } = req.params;
    const list  = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file !== "undefined"){
          let url =  req.file.path;
    let filename =  req.file.filename;
    list.image = {url,filename};
    await list.save();
    // console.log(url);
    // console.log(list);
    }
    req.flash("success","Listing is updated!");
    res.redirect("/listings");
}

//delete function
module.exports.delete = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing is deleted!");
    res.redirect("/listings");
}

