const Router = require('koa-router')
const router = new Router

//设置主页
router.get("/",async (ctx) => {
  //需要title
  await ctx.render("index",{
    title:"这是一个正经的title"
  })
})

//主要用来处理  用户登录  注册  退出  /user/
router.get(/^\/user\/(?=reg|login)/,async (ctx) => {
  //show 为true 则显示为注册 为false 显示为登录
  const show = /reg$/.test(ctx.path)
  await ctx.render("register",{show})
})


module.exports = router