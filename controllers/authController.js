const jwt=require("jsonwebtoken")
const User=require("../models/userModel")
const bcrypt=require('bcrypt')

/*
*/
exports.signup=async (req,res)=>{     
    try{
        const userObj={
            _id:(await User.find()).length===0?1:(await User.findOne().sort({_id:-1}).limit(1))._id+1,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:bcrypt.hashSync(req.body.password,10),
            email:req.body.email,
            contactNumber:req.body.contactNumber
        }
        /*practically we should not allow anyone to set the role of Admin as its basically owner of App
        one would need to change it from database*/
        if(/admin/i.test(req.body.role) || req.body.isAdmin)
            res.status(400).json({"message":"user role cannot be ADMIN"})
        else if(await User.findOne({email:userObj.email})){
            res.status(400).json({"message":"Try any other email, this email is already registered!"})
        }
        else{
            const user= await User.create(userObj)
            res.status(200).json({
                "_id": user._id,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
            })
        }
    }catch(err){
        console.log(err)
        res.status(400).json({"message":`server error ${err.message}`})
    }
}


exports.login= async (req,res)=>{
    try{
        const email=req.body.email
        const password=req.body.password
        const user=await User.findOne({email:email})
        if(!user){
            res.status(404).json({"message":"This email has not been registered!"})
        }
        else{
            if(!bcrypt.compareSync(password,user.password))
                res.status(403).json({"message":"Invalid Credentials!"})
            else{
                const token= jwt.sign({
                    id:email},
                    require("../configs/secretKey").key,
                    {expiresIn:'0.5h'
                })
                res.header({"x-auth-token":token})
                .status(200)
                .json({
                    "email":email,
                    "name":`${user.firstName} ${user.lastName}`,
                    "isAuthenticated": true
                })
            }
        }
    }catch(err){
        res.status(400).json({"message":err})
    }
    
}