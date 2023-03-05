const mongoConfig = require('../config/MongoSettings')
const PendingArticles = require('../models/PendingArticles')

mongoConfig.initialize();

const AddPending = async (req,res,next)=>{
    console.log("IN DB")
    const {user,articlename,filename,thumbnail} = req.body
    console.log(user,articlename,filename,thumbnail)
    try{
        const response = await PendingArticles.create({
            articleName:articlename,
            creator:user,
            createdTime: new Date(),
            filename:filename,
            thumbnail:thumbnail,
            likes:0

        })
        console.log(response)
        res.json({status:'Sucessful'})
    }
    catch(error){
        res.json({status:"error",message:'Internal Server Error'})
    }

}
module.exports = AddPending