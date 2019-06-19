const { db } = require('../Schema/config')

const ArticleSchema= require('../Schema/article')
const Article = db.model("articles",ArticleSchema)//通过 db 对象创建操作user数据库的模型对象

module.exports = Article