module.exports=(req,res,next)=>{
    try{
        const contactNumber=req.body.contactNumber
        //added additional feature that asks user/s to enter mobile number.
        if(!contactNumber)
            res.status(400).json({"message":"contact number is mandatory!"})
        else if(contactNumber.match(/([^0-9])/g) !== null || contactNumber.length>10)
            res.status(400).json({"message":"Invalid contact number!"})
        else    
            next()
    }catch(err){
        console.log(err)
        res.status(400).json({"message":`server error ${err.message}`})
    }
}