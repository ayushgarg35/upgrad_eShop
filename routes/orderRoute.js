const ordCntrl = require("../controllers/orderController")


module.exports = (app)=>{
    app.post('/orders',require("../middlewares/authenticate"),require("../middlewares/isUser"),ordCntrl.createOrders)
}