const jwt = require('jsonwebtoken')
const Topic = require('../models/topic')
const question  = require('../models/question')
class TopicsCtl {
  // 查询
  async getTopicsList(ctx) {
    const { size = 10 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1 // 计算当前页数
    const perpage = Math.max(size * 1, 1) // 每页显示的条数
    ctx.body = await Topic.find()
      .limit(perpage)
      .skip(page * perpage)
  }

  async findById(ctx) {
    ctx.body = await Topic.findById(ctx.params.id).select('+introduction')
  }

  async addTopic(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false }
    })
    const { name, avatar_url, introduction } = ctx.request.body
    const istopic = await Topic.findOne({ name })
    if (!istopic) {
      const topic = await new Topic(ctx.request.body)
      topic.save()
      ctx.body = topic
    } else {
      ctx.body = {
        message: '已存在',
        status: -1
      }
    }
  }
  async putTopic(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false }
    })
    // 查询id 是否存在
    console.log(ctx.params.id)
    const istopic = await Topic.findById(ctx.params.id)
    
    if (istopic) {
      const topic = await Topic.findByIdAndUpdate(
        ctx.params.id,
        ctx.request.body
      )
      ctx.body = topic
    } else {
      ctx.body = {
        message: '不存在id',
        status: -1
      }
    }
  }
  async getquestion(ctx) {
   const result =  await question.find({topics:ctx.params.id})
   ctx.body = result
  }
}

module.exports = new TopicsCtl()
