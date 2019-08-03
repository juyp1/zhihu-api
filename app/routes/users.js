const Router = require('koa-router')({ prefix: '/users' })
const { jwtsecrt } = require('../config/config')
const jwtKoa = require('koa-jwt')
const jwt = require('jsonwebtoken')
const {
  index,
  findbyId,
  addUser,
  putUser,
  delUser,
  checkOwner,
  signin,
  listFollowing,
  follow,
  unfollow,
  followlist,
  checkUserExist
} = require('../controllers/users.js')
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
Router.get('/', index)
Router.get('/:id', findbyId)
Router.post('/add', addUser)
Router.put('/:id', auth, putUser)
Router.delete('/:id', delUser)
Router.post('/signin', signin)
Router.get('/:id/following', listFollowing)
Router.put('/following/:id',auth,checkUserExist,follow)
Router.delete('/following/:id', auth,checkUserExist,unfollow)
Router.get('/followlist/:id', auth,followlist)
module.exports = Router
