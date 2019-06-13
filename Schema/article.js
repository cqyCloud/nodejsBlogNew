const { Schema } = require('./config')

const ArticleSchema = new Schema({
    title:String,
    content:String,
    author:String,
    tips:String
},{versionKey:false})


module.exports = ArticleSchema