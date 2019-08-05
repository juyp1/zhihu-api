const collecting  = require('../models/collecting')
class CollectingCtl {
  async getcollectings(ctx){
   ctx.body =  await collecting.find().populate('_id').populate('title').select('+name')

  }
  async collectingsadd(ctx){
    const result = await new collecting(ctx.request.body)
    result.save()
    ctx.body = result
  }
}
module.exports = new CollectingCtl()
