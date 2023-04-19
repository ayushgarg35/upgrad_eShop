const jwt = require("jsonwebtoken")

module.exports= (req, res, next) => {
    try {
        const token = req.headers["access-token"]
        if (!token)
            res.status(401).json({ "message": "Please login first to access this endpoint!" })
        else {
            /*i have saved the secretKey in a separate folder named configs as it holds
             all the configurations for the eShop, we can change the secret key from there.*/
            jwt.verify(token, require("../configs/secretKey").key, (err, decoded) => {
                if (err) {
                    console.log(err)
                    res.status(401).json({ "messaage": "unauthorised" })
                }
                else
                    req.email = decoded.id
                next()
            })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ "message": `server error ${err.message}` })
    }
}