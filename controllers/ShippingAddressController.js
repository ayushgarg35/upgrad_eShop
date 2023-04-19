const Address= require("../models/shippingAddressModel")
const User=require("../models/userModel")

exports.addAddress= async (req,res)=>{
    try{    const addressObj={
        name:req.body.name,
        contactNumber:req.body.contactNumber,
        city:req.body.city,
        state:req.body.state,
        zipcode:req.body.zipcode,
        street:req.body.street,
        landmark:req.body.landmark,
        user:await User.findOne({email:req.email})
    }
    const address =await Address.create(addressObj)
    res.status(200).json(address)
}catch(err){
    console.log(err)
    res.status(400).json({"message":`server error ${err.message}`})
}

}
