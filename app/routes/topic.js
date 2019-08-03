const Router = require('koa-router')({ prefix: '/topic' })
const jwt = require('jsonwebtoken')
const { jwtsecrt } = require('../config/config')
// 验证token登录
const auth = async (ctx, next) => {
  try {
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
const  { getTopicsList,addTopic,findById,putTopic,getquestion } = require('../controllers/topic.js')
Router.get('/', getTopicsList)
Router.post('/add', auth,addTopic)
Router.get('/topicbyid/:id',  findById)
Router.put('/put/:id', putTopic)
Router.get('/:id/question',getquestion)
module.exports = Router