const Products=require("../models/productModel")
const { default: mongoose } = require("mongoose")


exports.searchProducts=async (req,res)=>{
    try{
    const name=req.query.name || ""
    const category=req.query.category || ""
    let sortBy=req.query.sortBy || "productId"
    let direction="DESC"
    if(req.query.direction==="ASC")//ensuring the value of direction is either ASC or DESC
        direction=req.query.direction
    //creating an object for sorting
    const sortObj = {};
    sortObj[sortBy] = direction;
    //using regex to select category and name of products.
    const content= await Products.find({category:{$regex:category,$options:'i'},name:{$regex:name,$options:"i"}}).sort(sortObj)
    
    console.log(content)
    res.status(200).json(content)
    }catch(err){
        console.log(err)
        res.status(400).json({"message":"internal server error"})
    }
}
exports.getProductCategories=async (req,res)=>{
    const categoryList= await Products.distinct('category')
    console.log(categoryList)
    res.status(200).json({"categories":categoryList})

}

exports.getProductById = async (req,res)=>{
    try{
    const id= new mongoose.Types.ObjectId(req.params.id)
    console.log(id)
    const product= await Products.findOne({_id:id})
    console.log(product.name)
    if(!product){
        res.status(404).json({"message":`No Product found for ID - ${id}!`})
    }
    else{
        res.status(200).json(product)
    }}catch(err){
        console.log(err)
        res.status(400).json({"message":"internal server error"})
    }

}
exports.saveProduct = async (req,res)=>{
    try{
        const productObj={
            name:req.body.name,
            category:req.body.category,
            price:req.body.price,
            description:req.body.description,
            manufacturer:req.body.manufacturer,
            availableItems:req.body.availableItems,
            imageUrl:req.body.imageUrl
        }
        const product=await Products.create(productObj)
        res.status(200).json(
            {
                "_id": product._id,
                "name": product.name,
                "category": product.category,
                "price": parseInt(product.price),
                "description": product.description,
                "manufacturer": product.manufacturer,
                "availableItems": parseInt(product.availableItems),
                "createdAt": product.createdAt,
                "updatedAt": product.updatedAt
            }
        )
    }
    catch(err)
    {
        console.log(err)
        res.status(400).json({"message":"internal server error"})
    }


}

exports.updateProduct = async(req,res)=>{
    try{
        const updateProductObj={
            productId:new mongoose.Types.ObjectId(req.params.id),
            name : req.body.name,
            availableItems : req.body.availableItems,
            price : req.body.price,
            category : req.body.category,
            description : req.body.description,
            imageUrl : req.body.imageUrl,
            manufacturer : req.body.manufacturer,
            accessToken: req.headers['access-token']
        }
        const updatedProduct=await Products.findByIdAndUpdate(updateProductObj.productId,updateProductObj,{new:true})
            if(!updatedProduct)
                res.status(404).json({"message":`No Product found for ID - ${updateProductObj.productId}!`})
            else
                res.status(200).json(updatedProduct)
    }catch(err)
            {
                console.log(err)
                res.status(400).json({"message":"internal server error"})
            }
    //await Products.findByIdAndUpdate({_id:updateProductObj.productId},updateProductObj,[options.returnDocument='after'])

}

exports.deleteProduct = async(req,res)=>{
    try{
        const deleteProductObj={
            productId:new mongoose.Types.ObjectId(req.params.id),
            accessToken:req.headers['access-token']
        }
        const deletedObj=await Products.findById(deleteProductObj.productId)
        if(!deletedObj)
            res.status(404).json({"message":`No Product found for ID - ${deleteProductObj.productId}!`})
        else{
            await Products.findByIdAndRemove(deleteProductObj.productId)
            res.status(200).json({"message":`Product with ID - ${deleteProductObj.productId} deleted successfully!`})
        }
    }catch(err){
        console.log(err)
        res.status(400).json({"message":"internal server error"})
    }

}