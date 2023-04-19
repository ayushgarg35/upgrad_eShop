module.exports = (req, res, next) => {
    try{
        const email = req.body.email
        const part1 = email.split('@')[0]
        const part2 = email.split('@')[1].split('.')[0]
        const part3 = email.split('@')[1].split('.')[1]
        if (
            part1.length == 0 ||
            part1.match(/([^a-z\.A-Z0-9-_])/g) !== null||
            part2.length == 0 ||
            part2.match(/([^a-z\.A-Z0-9-_])/g) !==null ||
            part3.length < 2 ||
            part3.length > 6 ||
            part3.match(/([^a-zA-Z])/g) !== null
        )
            res.status(400).json({"message":"Invalid Email Address!"})
        else
            next()
    }catch(err){
        console.log(err)
        res.status(400).json({"message":`server error ${err.message}`})
    }    
}