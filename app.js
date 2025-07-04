if(process.env.NODE_ENV!="production")
require('dotenv').config()


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
var methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./router/listing.js");
const reviews = require("./router/review.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const UserRouter = require("./router/user.js");

db_url = process.env.ATLAS;
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(db_url);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());



//mongo store
const store = MongoStore.create({
    mongoUrl:db_url,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
})
    store.on("error",(e)=>{
        console.log(e);
    });
//session
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{ 
            expires:   Date.now() + 7*24*60*60*1000,
            maxAge: 7*24*60*60*1000,
            httpOnly:true,
            }
    };


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.currUser = req.user;
    next();
});
app.use((req,res,next)=>{
    res.locals.error = req.flash("error");
    next();
});

//routes
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.use("/",UserRouter);
app.get("/",(req,res)=>{
    res.redirect("/listings");
});
//error
app.use((req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
})
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("listings/error.ejs", { message });
});

//server listening
app.listen("3000", () => {
   console.log("connection started"); 
});