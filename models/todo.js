const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  todoItem: {
    type: String,
    required: true,
  },
  todoStatus: {
    type: Boolean,
    required: true,
    default: false
  },
  addedDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('Todo', todoSchema)