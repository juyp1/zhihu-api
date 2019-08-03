const mongoose = require('mongoose')
const { Schema, model } = mongoose
const answersSchema = new Schema({
  __v: { type: Number, select: false },
  content: { type: String, required: true },
  answer:{ type: Schema.Types.ObjectId, ref: 'User' },  // 回答人
  questionid:{ type:String  } // 所属问题
})
module.exports = model('Answers', answersSchema)
