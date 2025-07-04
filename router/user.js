const express = require('express');
const router = express.Router()        ;
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require('passport');
const userController = require("../controllers/users.js");

router
    .route("/login")
    //login page
    .get(userController.loginPage)
    //login success
    .post(passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),wrapAsync(userController.loginCheck));



router
    .route("/signup")
    //signup page
    .get(userController.signUpPage)
    //sign up check
    .post(wrapAsync(userController.signUpCheck));

//logOut page    
router.get("/logout",userController.logOut);

module.exports = router;