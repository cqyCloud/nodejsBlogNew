const { Schema } = require('./config')

const UserSchema = new Schema({
  username:String,
  password:String,
  role:{
    type:String,
    default:1
  },
  avatar:{
    type:String,
    default:"/avatar/default.jpg"
  },
  articleNum:Number,
  commentNum:Number
},{versionKey:false})

//用户删除
UserSchema.post("remove",doc => {
  //用户的文章 全部删除  对应的评论删除  对应的用户评论 -1
  // 用户的评论删除 对应的文章的数量 -1
  // console.log(doc)
  const Comment = require("../models/comment")
  const Article = require("../models/article")

  const { _id:userId } = doc

  Comment.find({from:userId})
    .then(data => {
      data.forEach(v => v.remove())
    })
  Article.find({author:userId})
    .then(data => {
      data.forEach(v => v.remove())
    })
})

module.exports = UserSchema