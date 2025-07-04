const express = require('express');
const router = express.Router()        ;
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { validatingSchema ,reviewSchema} = require("../joiSchema.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});


const validateListing= (req,res,next)=>{
   // console.log("REQ.BODY:", req.body);
    let {error} =  validatingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}

//new Route
router.get("/new",isLoggedIn,listingController.new);

router
    .route("/")
    //home page
    .get( wrapAsync(listingController.home))
    //create Route
    .post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.create));

router
    .route("/:id")
    //show route
    .get(wrapAsync(listingController.show))
    //update route
    .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync( listingController.update))
    //delete
    .delete(isLoggedIn,isOwner, wrapAsync(listingController.delete));




//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.edit));

module.exports = router;