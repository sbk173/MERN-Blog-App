//const mongoConfig = require('../config/MongoSettings')
const PendingArticles = require('../models/PendingArticles')
const AcceptedArticles = require('../models/AcceptedArticles')

const approve = async (req,res,next)=>{
    console.log("********",req.body)
    if(!req.body.filename){
        res.sendStatus(204)
    }
    else{
        const article = await PendingArticles.findOne({'filename':req.body.filename})
        if(article){

            console.log("ok",article)
            const a = {
                articleName:article.articleName,
                creator:article.creator,
                createdTime:article.createdTime,
                filename:article.filename,
                thumbnail:article.thumbnail,
                likes:article.likes

            }
            console.log(a)
            const response = await AcceptedArticles.create(a)
            console.log(response)
            await PendingArticles.deleteOne(article)
            res.sendStatus(200)
        }
        else{
            res.sendStatus(404) 
        }
    }
}

module.exports = approve