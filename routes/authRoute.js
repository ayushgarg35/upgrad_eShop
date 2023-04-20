const authCntrl = require("../controllers/authController")

module.exports= (app)=>{
    //signUp API
    app.post('/users',[require("../middlewares/emailValidator"),require("../middlewares/contactNumberValidator")],authCntrl.signup)
    //logIn API
    app.post('/login',authCntrl.login)
}