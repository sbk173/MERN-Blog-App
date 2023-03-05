const mongoose = require("mongoose")

const PendingSchema = mongoose.Schema(
    {
        articleName: {type:'String' , required:true , unique:true},
        creator: {type:'String', required: true},
        createdTime:{type:'Date'},
        filename:{type:'String',required: true, unique:true},
        thumbnail:{type:'String',required:true, unique:true},
        likes:{type:'Number'}
        
    },
    {collection:'PendingArticles'}
)

const model = mongoose.model('PendingSchema',PendingSchema)

module.exports = model