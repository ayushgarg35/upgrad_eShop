const Products= require("../models/productModel")
const Address= require("../models/shippingAddressModel")
const User=require("../models/userModel")
const Order = require("../models/orderModel")

exports.createOrders = async (req,res)=>{
    try{
        const user=await User.findOne({email:req.email})
        let orderObj={
            _id:(await Order.find()).length===0?1: (await Order.findOne().sort({_id:-1}).limit(1))._id+1,
            userId:user._id,
            shippingAddressId:req.body.addressId,
            productId:req.body.productId,
            quantity:req.body.quantity,
            amount:0.0
        }
        const product=await Products.findById(req.body.productId)
        const address= await Address.findById(req.body.addressId)

        
        if(!product)
            res.status(404).json({"message":`No Product found for ID - ${req.body.productId}!`})
        else if(!address)
            res.status(404).json({"message":`No Address found for ID - ${req.body.addressId}!`})
        else if(product.availableItems<orderObj.quantity)
            if(product.availableItems===0)
                res.status(404).json({"message":`Product with ID - ${req.body.productId} is currently out of stock`})
            else{
                //I added this additional feature myself as its more realisitc.
                res.status(404).json({"message":`Product with ID - ${req.body.productId} is not in as much stock as required. Only ${product.availableItems} available`})
            }
        else{
            orderObj.amount = product.price*orderObj.quantity
            const order= await Order.create(orderObj)

            /*in the next two line i have again added an extra feature which willupdate the quantity of a product once the order is created which is again more realistic*/
            
            await Products.findByIdAndUpdate(req.body.productId,{availableItems:(product.availableItems-orderObj.quantity).toString()})
            product.availableItems=(product.availableItems-orderObj.quantity).toString()
            res.status(200).json({
                "id":orderObj._id,
                "user":user,
                "product":product,
                "shippingAddress":address,
                "amount":orderObj.amount,
                "orderDate":order.orderDate
            })
    }}catch(err){
        console.log(err)
        res.status(400).json({"message":"internal server error"})
        parse
    }
    
}
