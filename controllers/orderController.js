const Products= require("../models/productModel")
const Address= require("../models/shippingAddressModel")
const User=require("../models/userModel")
const Order = require("../models/orderModel")

exports.createOrders = async (req,res)=>{
    try{
        const productId= req.body.productId
        const addressId= req.body.addressId

        let orderObj={
            _id:(await Order.find()).length===0?1: (await Order.findOne().sort({_id:-1}).limit(1))._id+1,
            user:await User.findOne({email:req.email}),
            shippingAddress:await Address.findById(addressId),
            product:await Products.findById(productId),
            quantity:req.body.quantity,
            amount:0.0
        }
        
        if(!orderObj.product)
            res.status(404).json({"message":`No Product found for ID - ${productId}!`})
        else if(!orderObj.shippingAddress)
            res.status(404).json({"message":`No Address found for ID - ${addressId}!`})
        else if(parseInt(orderObj.product.availableItems)<parseInt(orderObj.quantity))
            if(parseInt(orderObj.product.availableItems)===0)
                res.status(404).json({"message":`Product with ${productId} is currently out of stock`})
            else{
                //I added this additional feature myself as its more realisitc.
                res.status(404).json({"message":`Product with ${productId} is not in as much stock as required. Only ${orderObj.product.availableItems} available`})
            }
        else{
            orderObj.amount = parseFloat(orderObj.product.price)*parseFloat(orderObj.quantity)
            const order= await Order.create(orderObj)
            /*in the next two line i have again added an extra feature which willupdate the 
             quantity of a product once the order is created which is again more realistic*/
            await Products.findByIdAndUpdate(productId,{availableItems:(parseInt(orderObj.product.availableItems)-parseInt(orderObj.quantity)).toString()})
            orderObj.product.availableItems=(parseInt(orderObj.product.availableItems)-parseInt(orderObj.quantity)).toString()
            res.status(200).json(order)
    }}catch(err){
        console.log(err)
        res.status(400).json({"message":"internal server error"})
        parse
    }
    
}