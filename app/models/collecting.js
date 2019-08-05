const mongoose = require('mongoose')
const { Schema, model } = mongoose
const collectingSchema = new Schema({
  __v: { type: Number, select: false },
  question: [{ type: Schema.Types.ObjectId,ref:'question'}],
  users:{type: Schema.Types.ObjectId,ref:'User'}
})
module.exports = model('collecting', collectingSchema)