const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
  name: String,
  description: String,
  status: Boolean,
  dueDate: Date
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo