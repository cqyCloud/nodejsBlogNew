const { db } = require('../Schema/config')
const CommentSchema= require('../Schema/comment')
const Comment = db.model("comments",CommentSchema)//通过 db 对象创建操作user数据库的模型对象

module.exports = Comment