const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({

 original: String,

 sizes:[
   {
     width:Number,
     height:Number,
     path:String
   }
 ],

 createdAt:{
   type:Date,
   default:Date.now
 }

});

module.exports = mongoose.model("Image",imageSchema);