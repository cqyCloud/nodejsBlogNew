const Article = require("../models/article")
const Comment = require("../models/comment")
const User = require("../models/user")


// 返回文章发表页
exports.addPage = async (ctx) => {
  await ctx.render("add-article",{
    title:"文章发表页",
    session:ctx.session
  })
}

//文章的发表 (保存到数据库)
exports.add = async (ctx) => {

  if (ctx.session.isNew) {
    //true 就没登录 就不需要查询数据库
    return ctx.body = {
      msg:"用户未登录",
      status:0
    }
  }

  //用户登录
  //这是用户在登录情况下,post 发送过来的数据
  const data = ctx.request.body
  
  //添加文章的作者
  data.author = ctx.session.uid
  data.commentNum = 0

  await new Promise((resolve,reject) => {
    new Article(data).save((err,data) => {
      if(err)return reject(err)
      //更新用户文章计数
      User.update({_id:data.author},{$inc:{articleNum: 1}}, err => {
        if(err)return console.log(err)
      })
      
      resolve(data)
    })
  })
  .then(data => {
    ctx.body = {
      msg:"保存成功",
      status:1
    }
  })
  .catch(err => {
    ctx.body = {
      msg:"发表失败",
      status:0
    }
  })
}

//获取文章列表
exports.getList = async ctx => {
  //查询每篇文章对应的作者的头像
  // id ctx.params.id
  let page = ctx.params.id || 1
  page--

  const maxNum = await Article.estimatedDocumentCount((err,num) => err? console.log(err) : num)

  const artList = await Article
    .find() 
    .sort('-created')
    .skip(5*page)
    .limit(5)
    //拿到5条数据
    .populate({
      path: "author",
      select: '_id username avatar'
    }) //mongoose 用于连表查询
    .then(data => data)
    .catch(err => console.log(err))

  // console.log(artList)
  

  await ctx.render("index",{
    session:ctx.session,
    title:"实战博客首页",
    artList,
    maxNum
  })

  // await ctx.render("index",{})
}

//文章详情
exports.details = async ctx => {
  //取动态路由的 id值
  const _id = ctx.params.id

  //查找文章本身数据
  const article = await Article
    .findById(_id)
    .populate({
      path:"author",
      select:"username"
    })
    .then(data => data)
    .catch(err => console.log(err))
  
  //查找跟当前文章关联的所有评论
  const comment = await Comment
    .find({article:_id})
    .sort("-created")
    .populate({
      path:"from",
      select:"username avatar"
    })
    .then(data => data)
    .catch(err => console.log(err))

  // console.log(comment)

  await ctx.render("article",{
    title: article.title,
    article,
    comment,
    session: ctx.session
  })
}

//返回用户所有文章
exports.artlist = async ctx => {
  const uid = ctx.session.uid

  const data = await Article.find({author:uid})
  
  ctx.body = {
    code:0,
    count:data.length,
    data
  }
}

// 删除对应id的文章
exports.del = async ctx => {
  const _id = ctx.params.id

  let res = {
    state:1,
    message:"成功"
  }
  await Article.findById(_id)
    .then(data => data.remove())
    .catch(err => {
      res = {
        state:0,
        message:err
      }
    })


  ctx.body = res
}