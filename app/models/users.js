const mongoose = require('mongoose')
const { Schema, model } = mongoose
const userSchema = new Schema({
  __v: { type: Number, select: false },
  name: {
    type: String,
    require: true
  },
  password: { require: true, type: String, select: false }, //12234
  avatar_url: { type: String },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
    require: true
  }, // 可枚举
  headline: { type: String },
  locations: { type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }] },
  business: { type: Schema.Types.ObjectId, ref: 'Topic' },
  employments: {
    type: [
      {
        compant: { type: Schema.Types.ObjectId, ref: 'Topic' },
        job: { type: Schema.Types.ObjectId, ref: 'Topic' }
      }
    ]
  },
  educations: {
    type: [
      {
        school: {
          type: Schema.Types.ObjectId,
          ref: 'Topic'
        },
        major: {
          // 专业
          type: Schema.Types.ObjectId,
          ref: 'Topic'
        },
        diploma: { type: Number, enum: [1, 2, 3, 4, 5, 6] }, // 学历
        entrance_year: { type: Number }, // 入学
        gradution_year: { type: Number } // 毕业年份
      }
    ]
  },
  following: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    select: false
  },
  followingTopics: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
  }
})

module.exports = model('User', userSchema)
