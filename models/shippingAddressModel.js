
const mongoose = require("mongoose")
const SASchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contactNumber:{
        type:String,
        required:true,
    },
    street:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zipcode:{
        type:String,
        required:true
    },
    landmark:String,
    createdAt:{
        type:Date,
        default:()=> {return Date.now()},
        immutable:true
    },
    updatedAt:{
        type:Date,
        deafult:()=>{
            return Date.now()
        }
    },
    user:{
        type:Object,
        required:true,
    }
})
module.exports=new mongoose.model('addresses',SASchema)