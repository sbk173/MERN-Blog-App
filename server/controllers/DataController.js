const PendingArticles = require('../models/PendingArticles')
const AcceptedArticles = require('../models/AcceptedArticles')

const DataController= async (req,res,next) => {
    if(req.params.database == 'PendingArticles'){
        const articles = await PendingArticles.find({})
        console.log(articles)
        res.json(articles)
    }
    else if(req.params.database == 'AcceptedArticles'){
        const articles = await AcceptedArticles.find({})
        console.log(articles)
        res.json(articles)
    }

}

module.exports = DataController;