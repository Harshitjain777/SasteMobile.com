const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    image:String,
    brand:String,
    name:String,
    price:Number,
    description:String,
    contact:Number,
    email:String
})

module.exports=mongoose.model("products" , productSchema);