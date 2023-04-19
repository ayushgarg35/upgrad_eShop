const authCntrl = require("../controllers/authController")

module.exports= (app)=>{
    app.post('/users',[require("../middlewares/emailValidator"),require("../middlewares/contactNumberValidator")],authCntrl.signup)
    app.post('/login',authCntrl.login)
}