const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    _id:{
        type:Number,
        require:true
    },
    userId:{
        type:Number,
        required:true
    },
    productId:{
        type:Number,
        required:true
    },
    shippingAddressId:{
        type:Number,
        required:true
    },
    amount:{
        type:mongoose.Schema.Types.Decimal128,
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
