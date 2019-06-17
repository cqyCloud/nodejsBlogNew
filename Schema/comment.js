const { Schema } = require('./config')
const ObjectId = Schema.Types.ObjectId
 
const CommentSchema = new Schema({
  content:String,
  //关联用户表
  from:{
    type:ObjectId,
    ref:"users"
  },
  //关联article表 --> 集合
  article:{
    type:ObjectId,
    ref:"articles"
  }
}, {versionKey:false, timestamps:{
  createdAt:"created",
  updatedAt:"updated"
  }
})


module.exports = CommentSchema