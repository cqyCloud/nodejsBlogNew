const Koa = require('koa')
const views = require('koa-views')
const static = require('koa-static')
const { join } = require('path')
const router = require('./routers/router')
const session = require('koa-session')
const logger = require('koa-logger')
const body = require('koa-body')

const app = new Koa

app.keys = ["步惊云"]

// session 的配置对象
const CONFIG = {
  key:'Sid',
  maxAge:36e5,//毫秒 1小时过期
  // autoCommit:true,
  overwrite:true,//是否覆盖
  httpOnly:true,
  // signed:true,//是否签名
  rolling:true,//是否要刷新
  // renew:false
}


//注册日志模块 监测日志 第一个注册
// app.use(logger())

//配置koa-body 处理post 请求数据
app.use(body())

//注册session 类似前端的cookie
app.use(session(CONFIG,app))

//配置视图模块
app.use(views(join(__dirname,'views'),{
  extension:'pug'
}))

//设置静态资源目录
app.use(static(join(__dirname,'public')))

//注册路由信息
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000,() => {
  console.log('项目启动成功')
})

//创建管理员用户  如果管理员用户已经存在 则返回
{
  //admin admin
  const { db } = require('./Schema/config')
  const UserSchema= require('./Schema/user')
  const encrypt = require("./util/encrypt")
  const User = db.model("users",UserSchema)

  User
    .find({username:"admin"})
    .then(data => {
      if(data.length === 0){
        //管理员不存在 创建
        new User({
          username:"admin",
          password:encrypt("admin"),
          role:666,
          commentNum:0,
          articleNum:0
        })
          .save()
          .then(data => {
            console.log("管理员用户名 -> admin, 密码 -> admin")
          })
          .catch(err => {
            console.log("管理员账号检查失败")
          })
      }else{
        //在控制台输出
        console.log("管理员用户名 -> admin, 密码 -> admin")
      }
    })
}