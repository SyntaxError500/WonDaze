const Listing = require("./models/listing");
const Review = require("./models/review");

module.exports.isLoggedIn = (req,res,next)=>{
     if(!req.isAuthenticated()){
        req.flash("error","Login required")
       return res.redirect("/login");
    }
    next();
}
module.exports.isOwner = async (req,res,next)=>{
   let {id} = req.params;
   let list = await Listing.findById(id);
    if(!list.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission to delete this");
        return res.redirect(`/listings${id}`);
    }
    next();
}
module.exports.isAuthor = async (req,res,next)=>{
   let {reviewId} = req.params;
   let list = await Review.findById(reviewId);
    if(!list.author.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission to delete this");
        return res.redirect(`/listings${reviewId}`);
    }
    next();
}