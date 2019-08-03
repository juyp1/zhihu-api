const Question = require('../models/question')

class QuesCtrl {

  async QuestionALL(ctx) {
    const { size = 10 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1 // 计算当前页数
    const perpage = Math.max(size * 1, 1) // 每页显示的条数
    ctx.body = await Question.find()
      .limit(perpage)
      .skip(page * perpage)
  
  }
  async QuestionbyId(ctx) {
   const question = await Question.findById(ctx.params.id).populate('questioner').populate('tops')
    if(!question) {
      ctx.throw(404,'问题不存在')
    }else {
      ctx.body = question
    }
  }
  async  Questionbyadd(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      description: { type: 'string', required: false },
    })
    const question = await new Question({... ctx.request.body,questioner:ctx.state.user._id})
    question.save()
    ctx.body = question
  }
  async Questionput(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      description: { type: 'string', required: false },
    })
    const question = await Question.findById(ctx.params.id)
    if(!question) {
      ctx.throw(404,'问题不存在')
    }else {
     const result = await Question.findByIdAndUpdate(ctx.params.id,{... ctx.request.body,questioner:ctx.state.user._id})
     ctx.body = result
    }
  }

  async Questiondel(ctx) {
    const question = await Question.findById(ctx.params.id)
    if(!question) {
      ctx.throw(404,'问题不存在')
    }else {
      ctx.body =  await Question.findByIdAndRemove(ctx.params.id)
    }
  }
  async Questionlist(ctx) {
    const list = await Question.find({questioner:ctx.params.id})
    ctx.body = list
  }
}
 
module.exports = new QuesCtrl()