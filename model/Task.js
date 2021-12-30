const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  admin_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  assigned_to: {
    type: String,
    default: null,
  },
  sub_tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sub-task',
    },
  ],
});

const task = mongoose.model('task', TaskSchema);
module.exports = task;
