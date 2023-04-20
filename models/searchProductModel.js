const mongoose=require('mongoose')

const searchProductSchema= new mongoose.Schema({
    category:{
        type:String,
        default:''
    },
    direction:{
        type:String,
        enum:['DESC','ASC'],
        default:'DESC'
    },
    name:{
        type:String,
        default:''
    },
    sortBy:{
        type:String,
        default:"productId"
    }
})
module.exports= new mongoose.model('productSearch',searchProductSchema)