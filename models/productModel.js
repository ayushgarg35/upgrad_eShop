const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    availableItems: {
        type: String,
        default: '0'
    },

    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },
    imageUrl: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    }, 
    createdAt: {
        type: Date,
        default: () => { return Date.now() },
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => { return Date.now() }
    }

})

module.exports=new mongoose.model('products',productSchema)