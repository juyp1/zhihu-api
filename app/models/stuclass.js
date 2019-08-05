const mongoose = require('mongoose')
const { Schema, model } = mongoose
const stuclassSchema = new Schema({
  __v: { type: Number, select: false },
    name:{type:String,required:true}
})
module.exports = model('stuclass', stuclassSchema)