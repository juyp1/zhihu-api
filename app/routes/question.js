const Router = require('koa-router')({ prefix: '/question' })
const jwt = require('jsonwebtoken')
const { jwtsecrt } = require('../config/config')
// 验证token登录
const auth = async (ctx, next) => {
  try {
    console.log(ctx.request.header.authorization)
    ctx.state.user = getJWTPayload(ctx.request.header.authorization)
  } catch (error) {
    ctx.throw(401, '登录超时请重新登录')
  }
  await next()
}
function getJWTPayload(token) {
  // 验证并解析JWT
  return jwt.verify(token.split(' ')[1], jwtsecrt)
}
const  { QuestionALL,QuestionbyId,Questionbyadd,Questionput,Questiondel,Questionlist } = require('../controllers/question.js')
Router.get('/',QuestionALL)
Router.get('/:id',QuestionbyId)
Router.post('/',auth,Questionbyadd)
Router.put('/:id',auth,Questionput)
Router.get('/users/:id',Questionlist)
module.exports = Router