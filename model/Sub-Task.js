const mongoose = require('mongoose');

const SubTaskSchema = mongoose.Schema(
  {
    name: {
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
  },
  {
    versionKey: false,
  }
);
const sub_task = mongoose.model('sub-task', SubTaskSchema);
module.exports = sub_task;
