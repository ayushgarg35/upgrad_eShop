module.exports = (req,res,next)=>{
    try{
        const zipcode= req.body.zipcode
        if(!zipcode)
            res.status(400).json({"message":"zip code is mandatory!"})
        else if(zipcode.match(/[^0-9]/g)!=null || zipcode.length!=6)
            res.status(400).json({"message":"Invalid zip code!"})
        else next()
    }catch(err){
        console.log(err)
        res.status(400).json({"message":`server error ${err.message}`})
    }    

}