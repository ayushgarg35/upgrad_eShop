const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    _id:{
        type:Number,
        required:true,
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contactNumber:{
        type:String,
        required:true,
        maxlength:10
    },
    created:{
        type: Date,
        immutable:true,
        default : ()=>{
            return Date.now()
        }
    },
    updated:{
        type:Date,
        default:()=>{
            return Date.now()
        }
    },
    role:{
        type:String,
        default:"User"
    },
    isAdmin:{
        type:Boolean,
        default:null
    }
})

module.exports= new mongoose.model('user',UserSchema)