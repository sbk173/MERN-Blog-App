const mongoose = require("mongoose")

const AcceptedSchema = mongoose.Schema(
    {
        articleName: {type:'String' , required:true , unique:true},
        creator: {type:'String', required: true},
        createdTime:{type:'Date'},
        filename:{type:'String',required: true, unique:true},
        thumbnail:{type:'String',required:true, unique:true},
        likes:{type:'Number'}
        
    },
    {collection:'AcceptedArticles'}
)

const model = mongoose.model('AcceptedSchema',AcceptedSchema)

module.exports = model