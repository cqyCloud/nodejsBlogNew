const Article = require("../models/article")
const Comment = require("../models/comment")
const User = require("../models/user")

const fs = require("fs")
const { join } = require('path')

exports.index = async ctx => {
  if(ctx.session.isNew){
    //没有登录
    ctx.status = 404
    return await ctx.render("404",{title:"404"})
  }

  const id = ctx.params.id

  const arr = fs.readdirSync(join(__dirname,"../views/admin"))

  arr.forEach(v => {
    const name = v.replace(/^(admin\-)|(\.pug)$/g,"")
    if(name === id){
      flag = true
    }
  })
  if(flag){
    await ctx.render("./admin/admin-"+id,{
      role:ctx.session.role
    })
  }else{
    ctx.status = 404
    await ctx.render("404",{title:"404"})
  }

}

//获取用户列表
exports.userlist = async ctx => {
  const data = await User.find({role:1})

  ctx.body = {
    code:0,
    count:data.length,
    data
  }
}

// 删除用户
exports.del = async ctx => {
  const _id = ctx.params.id

  let res = {
    state:1,
    message:"成功"
  }
  await User.findById(_id)
    .then(data => data.remove())
    .catch(err => {
      res = {
        state:0,
        message:err
      }
    })


  ctx.body = res
}