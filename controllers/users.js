const User = require("../models/user.js");
const ExpressError = require("../utils/ExpressError.js");

//login page
module.exports.loginPage = (req,res)=>{
    res.render("./listings/login.ejs");
}

//login check
module.exports.loginCheck = async(req,res)=>{
    req.flash("success","Welcome back to WanderLust");
    res.redirect("/listings");
}

//sign up page
module.exports.signUpPage = (req,res)=>{
    res.render("./listings/signup.ejs");
}

//sign up check
module.exports.signUpCheck = async(req,res)=>{
   try { let {username,email,password} = req.body;
    const newUser = new User ({email,username});
    await User.register(newUser,password);
    req.flash("success","Welcome to WanderLust");
    res.redirect("/listings");}
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

//log out
module.exports.logOut = (req,res)=>{
    req.logout((err)=>{
        if(err)
           return next(err);
        else{
            req.flash("success","You are logged out");
             res.redirect("/login");
        }
    })
}