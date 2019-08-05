const mongoose = require('mongoose')
const { Schema, model } = mongoose
const studentSchema = new Schema({
  __v: { type: Number, select: false },
   name:{type:String,required:true},
   classId:{type:Schema.Types.ObjectId,ref:'stuclass'},
   age:{type:Number,required:true},
   address:{type:String}
})
module.exports = model('student', studentSchema)