const jwt = require('jsonwebtoken')
const User = require('../models/users')
const { jwtsecrt } = require('../config/config')
// const redis = require('../config/redis')
class UsersCtl {
  async index(ctx) {
    let user = ctx.state.user
    ctx.body = await User.find()
  }
  async findbyId(ctx) {
    ctx.body = await User.findById(ctx.params.id).populate(
      '+following locations business educations.school '
    )
  }
  async checkOwner(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, '没有权限')
    }
    await next()
  }
  async addUser(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', require: true },
      avatar_url: { type: 'string', require: false },
      gender: { type: 'string', require: false },
      headline: { type: 'string', require: false },
      locations: { type: 'array', itemType: 'string', require: false },
      business: { type: 'string', require: false },
      employments: { type: 'array', itemType: 'object', require: false },
      educations: { type: 'array', itemType: 'object', require: false }
    })
    const { name } = ctx.request.body
    const isuser = await User.findOne({ name })
    if (isuser) {
      ctx.body = '用户已存在'
      ctx.throw(409, '用户被占用')
    } else {
      const user = await new User(ctx.request.body).save()
      ctx.body = user
    }
  }

  async putUser(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      password: { type: 'string', require: false },
      avatar_url: { type: 'string', require: false },
      gender: { type: 'string', require: false },
      headline: { type: 'string', require: false },
      locations: { type: 'array', itemType: 'string', require: false },
      business: { type: 'string', require: false },
      employments: { type: 'array', itemType: 'object', require: false },
      educations: { type: 'array', itemType: 'object', require: false }
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) {
      ctx.status = 404
    } else {
      ctx.body = user
    }
  }
  async delUser(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) {
      ctx.status = 404
    } else {
      ctx.status = 204
    }
  }
  async signin(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', require: true }
    })

    const { name, password } = ctx.request.body
    const user = await User.findOne({ name, password })
    if (!user) {
      ctx.throw(401, '用户或密码不存在')
    } else {
      const { _id, name } = user

      // redis.set('sessionId', name)
      const token = jwt.sign({ _id, name }, jwtsecrt, { expiresIn: '1d' })
      // redis.get('sessionId').then(function(result) {
      //   console.log('sessionId',result)
      // })
      ctx.body = {
        token: token
      }
    }
  }
  // 获取 用户粉丝和关注者
  async listFollowing(ctx) {
    const user = await User.findById(ctx.params.id)
      .select('+following')
      .populate('following')
    if (!user) {
      ctx.throw(404)
    } else {
      ctx.body = user.following
    }
  }
  // 检查用户是否存在
  async checkUserExist(ctx, next) {
    const user = await User.findById(ctx.params.id)
    console.log('1111', user)
    if (!user) {
      ctx.throw(404, '用户不存在')
    } else {
      await next()
    }
  }
  // 关注莫个人
  async follow(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+following') // 获取关注者列表
    if (!me.following.map(id => id.toString()).includes(ctx.params.id)) {
      me.following.push(ctx.params.id)
      me.save()
    }
    ctx.status = 204
  }

  // 取消关注
  async unfollow(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+following') // 获取关注者列表
    let index = me.following.map(id => id.toString()).indexOf(ctx.params.id)
    console.log(index)
    if (index > -1) {
      me.following.splice(index, 1)
      me.save()
    }
    ctx.status = 204
  }

  // 获取粉丝
  async followlist(ctx) {
    const Users = await User.find({ following: ctx.params.id }).select(
      '+following'
    )
    ctx.body = Users
  }
}

module.exports = new UsersCtl()
