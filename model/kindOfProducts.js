const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:String,
        lowerCase:true,
        enum:['fruit','vegetable','dairy','perfume']
    }
})
const allProducts= mongoose.model('allproducts',productSchema);
module.exports = allProducts;