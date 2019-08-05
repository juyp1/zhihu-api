const Stuclass = require('../models/stuclass')
class StuclassCtl {
  async list(ctx) {
    ctx.body = await Stuclass.find()
  }

  async add(ctx) {
    const result = await new Stuclass(ctx.request.body)
    result.save()
    ctx.body = result 
  }
}

module.exports = new StuclassCtl()