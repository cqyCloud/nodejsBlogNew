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

//设置comment 的 remove钩子
CommentSchema.post("remove",(doc) => {
  //当前这个回调函数 一定会在 remove 事件执行触发
  const Article = require("../models/article")
  const User = require("../models/user")

  let { from, article } = doc
  //对应评论数 -1
  Article.updateOne({_id: article},{$inc:{commentNum:-1}}).exec()
  //当前被删除评论的作者 commentNum -1
  User.updateOne({_id: from},{$inc:{commentNum:-1}}).exec()
})


module.exports = CommentSchema