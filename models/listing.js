const mongoose = require("mongoose");
const review = require("./review");
const { ref } = require("joi");
const Schema = mongoose.Schema;
const listSchema = new Schema({
    title:{
        type:String,
    },
    description:String,
    image: { 
    url:String,
    filename:String,
},
    price:String,
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",

    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        },
    geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
    }    
});
const listing  = mongoose.model("listing",listSchema);
module.exports = listing;