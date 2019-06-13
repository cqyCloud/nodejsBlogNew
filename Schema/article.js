const { Schema } = require('./config')
const ObjectId = Schema.Types.ObjectId
 
const ArticleSchema = new Schema({
  title:String,
  content:String,
  author:{
    type:ObjectId,
    ref:"users"
  },//关联 users 的表 ....
  tips:String
}, {versionKey:false, timestamps:{
  createAt:"created",
  updateAt:"updated"
  }
})


module.exports = ArticleSchema