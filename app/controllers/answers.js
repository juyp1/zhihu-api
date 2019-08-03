const Answers = require('../models/answers')
class AnswersCtl {
  async Answerslist(ctx) {
    const { size = 10 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1 // 计算当前页数
    const perpage = Math.max(size * 1, 1) // 每页显示的条数
    const list  = await Answers.find().limit(perpage)
     .skip(page * perpage)
     ctx.body = list
  }
  async AnswersAdd(ctx)  {
    ctx.verifyParams({
      content: { type: 'string', required: true },
      questionid: { type: 'string', required: true },
    })
    const answers = await new Answers({...ctx.request.body,answer:ctx.state.user._id})
    answers.save()
    ctx.body = answers
  }
  async AnswersPut(ctx)  {
    ctx.verifyParams({
      content: { type: 'string', required: true },
      questionid: { type: 'string', required: true },
    })
    const answers = await Answers.findByIdAndUpdate(ctx.params.id,{...ctx.request.body,answer:ctx.state.user._id})
    ctx.body = answers
  }
  async AnswersDel(ctx) {
   const result = await Answers.findByIdAndDelete(ctx.params.id);
    ctx.body = result
  }
  async AnswersbyId(ctx) {
    ctx.body = await Answers.findById(ctx.params.id)
  }
}


module.exports = new AnswersCtl()

