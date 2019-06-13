//连接数据库 导出db Schema
const mongoose = require('mongoose')
const db = mongoose.createConnection("mongodb://localhost:27017/blogproject",{useNewUrlParser:true})

//用原生es6 的promise 代替mongoose 自实现的 promise
mongoose.Promise = global.Promise

//把mongoose 的 schema 取出来
const Schema = mongoose.Schema

db.on("error",() => {
  console.log("连接数据库失败")
})

db.on("open", () => {
  console.log("blogproject 数据库链接成功")
})


module.exports = {
  db,
  Schema
}