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

const CONFIG = {
  keys:'Sid',
  maxAge:36e5,//毫秒
  autoCommit:true,
  overwrite:true,
  httpOnly:true,
  signed:true,
  rolling:true,
  renew:false
}


//注册日志模块 监测日志 第一个注册
// app.use(logger())

<<<<<<< HEAD
//配置koa-body 处理post 请求数据
app.use(body())

//注册session
app.use(session(CONFIG,app))

=======
//注册session
app.use(session(CONFIG,app))

//配置 koa-body 处理 post 请求数据
app.use(body())

>>>>>>> 30ee51bd7543f02f0c8695ca268b21bf8fa5f921
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