const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {hashPassword} = require('../helpers/bcrypt')

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'User email is required']
  },
  password: {
    type: String,
    require: [true, 'User password is required']
  }
})

UserSchema.pre('save', function(next) {
  let hash = hashPassword(this.password)
  this.password = hash
  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User