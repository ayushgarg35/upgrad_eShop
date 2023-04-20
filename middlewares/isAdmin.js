const User = require("../models/userModel")

module.exports= async (req,res,next)=>{
    try{
        const email = req.email
        const user= await User.findOne({email:email})
        const role=user.role.toUpperCase()
        const isAdmin=user.isAdmin
        if((role && role !== "ADMIN") || (isAdmin!==undefined && isAdmin===false)){
            res.status(403).json({"message":"You are not authorised to access this endpoint!"})
        }else if(role===undefined && isAdmin===undefined){
            res.status(404).json({"message":"Your role is not defined"})
        }
        else{
            next()
        }
    }catch(err){
        console.log(err)
        res.status(400).json({"message":`server error ${err.message}`})
    }    
}