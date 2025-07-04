const express = require('express');
const router = express.Router({mergeParams:true});
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");

const { validatingSchema ,reviewSchema} = require("../joiSchema.js");
const reviewsController = require("../controllers/reviews.js");
const { isLoggedIn, isAuthor } = require('../middleware.js');

const validateReview= (req,res,next)=>{
    let {error} =  reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}

//add new review
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewsController.new));
// router.use( (req, res) => {
//     res.status(404).send("Fallback route triggered — no route matched");
// });

//delete review
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewsController.delete));

module.exports = router;