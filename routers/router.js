const Router = require("koa-router")
const router = new Router
const user = require("../control/user")

//设计主页
router.get("/",user.keepLog,async ctx => {
  //需要title
  await ctx.render("index",{
    title:"这是一个正经的主页"
  })
})

// 主要用来处理返回 用户登录 用户注册
router.get(/^\/user\/(?=reg|login)/,async (ctx) => {

  // show 为 true 则显示注册 false 显示登录
  const show = /reg$/.test(ctx.path)

  await ctx.render("register",{show})
})

//注册用户
router.post("/user/reg",user.reg)

// 用户登录
router.post("/user/login",user.login)

module.exports = router