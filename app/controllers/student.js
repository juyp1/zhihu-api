const Student = require('../models/student')
class StudentCtl {
  async list(ctx) {
    ctx.body = await Student.find().populate('classId')
  }

  async add(ctx) {
    const result = await new Student(ctx.request.body)
    result.save()
    ctx.body = result 
  }
}

module.exports = new StudentCtl()