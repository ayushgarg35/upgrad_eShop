const express = require('express')
const app=express()

const mongoose = require("mongoose")

const bodyParser=require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const headerParser = require("UpGrad_eShop/node_modules/header-parser")
app.use(headerParser)

mongoose.connect(require("UpGrad_eShop/configs/dbConfig").URL)
const db=mongoose.connection

db.once("open",()=>{
    console.log('successfully connected to DB')
    //this dbConfig folder has the URL for the dataBase and we can change this Url whenever we like without touching our code
    console.log(require("UpGrad_eShop/configs/dbConfig").URL)
})

db.on('error',(err)=>{
    console.log('connection error '+err)
    process.exit()
})

//importing and running routes for API endpoint- I,II,III,IV respectively
require("UpGrad_eShop/routes/authRoute")(app)
require("UpGrad_eShop/routes/shippingAddressRoute")(app)
require("UpGrad_eShop/routes/productRoute")(app)
require("UpGrad_eShop/routes/orderRoute")(app)

//this serverConfig folder has the name of the localHost port and we can change it whenever we like without touching our code
app.listen(require("UpGrad_eShop/configs/serverConfig").PORT)


