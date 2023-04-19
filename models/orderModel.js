const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user:{
        type:Object,
        required:true
    },
    product:{
        type:Object,
        required:true
    },
    shippingAddress:{
        type:Object,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    orderDate:{
        type: Date,
        default: ()=>{
            return Date.now()
        },
        immutable:true
    }
})

module.exports = new mongoose.model('orders',orderSchema)
