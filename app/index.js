const Koa = require('koa')
const path = require('path')
const koabody = require('koa-body')
const app = new Koa()
const routing = require('./routes/index')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const koaStatic = require('koa-static')
const mongoose = require('mongoose')
const config = require('./config/config.js')
// console.log(config.connectUrl)
app.use(koabody({
  multipart:true,
  formidable:{
    uploadDir:path.join(__dirname,'/public/upload'), //路径
    keepExtensions:true   // 保留拓展名
  }
}))
app.use(parameter(app))
app.use(koaStatic(path.join(__dirname,'public')))
mongoose.connect(config.connectUrl,{useNewUrlParser:true},()=>console.log('MongoDB 连接成功了'))
mongoose.connection.on('error',console.error)
app.use(error({
  postFormat:(e,{
    stack,...rest
  })=>process.env.NODE_ENV==='production'?rest:{stack,...rest}
}))

routing(app)
// app.use( async (ctx,next)=>{
//   ctx.body="zhihuapi慕课网111"
//   await next()
//   console.log('333')

// })
// app.use(async(ctx,next)=> {
//   console.log('111')
//   next()
//   console.log('444')
// })

// app.use(async(ctx,next)=>{
//   console.log('222')
//   next()
//   console.log('555')
// })

app.listen(3000, () => {
  console.log('程序启动在3000端口下--pm2')
})
