const Router = require('koa-router')
//拿到操作user表的逻辑对象
const user = require('../control/user')


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

router.post('/user/login',async ctx => {
  // console.log("用户需要登录，登录的数据：")
  // console.log(ctx.request.body)
  const data = ctx.request.body

})

//注册用户
router.post("/user/reg",user.reg)





module.exports = router