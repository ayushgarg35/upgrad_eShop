const Products= require("../controllers/productController")

module.exports=(app)=>{
    //Search Product
    app.get('/products',Products.searchProducts)
    //Get Product Categories
    app.get('/products/categories',Products.getProductCategories)
    //Get Product By Id
    app.get('/products/:id',Products.getProductById)
    //Save Product By Admin
    app.post('/products',require("../middlewares/authenticate"),require("../middlewares/isAdmin"),Products.saveProduct)
    //Update Product By Admin
    app.put('/products/:id',require("../middlewares/authenticate"),require("../middlewares/isAdmin"),Products.updateProduct)
    //Delete Product By Admin
    app.delete('/products/:id',require("../middlewares/authenticate"),require("../middlewares/isAdmin"),Products.deleteProduct)
}
