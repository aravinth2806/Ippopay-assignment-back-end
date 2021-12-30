const Task = require('../model/Task');
const SubTask = require('../model/Sub-Task');

//post data using id for sub_Task
exports.createSubTask = async (req, res) => {
  await SubTask.create(req.body)
    .then((sub_tasks) => {
      return Task.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { sub_tasks: sub_tasks._id } },
        { new: true }
      );
    })
    .then((data) => {
      res.status(201).json({
        data,
        message: 'Success',
      });
    })
    .catch((err) => {
      const Error = err.toString();
      res.status(400).json({
        Error,
        message: 'Bad Request',
      });
    });
};
// get particular data(sub_Task) using id
exports.getSubTaskById = async (req, res) => {
  await SubTask.findById({ _id: req.params.id })
    // .populate('sub_Task')
    .then((data) => {
      res.status(200).json({
        data,
        message: 'Success',
      });
    })
    .catch((err) => {
      const Error = err.toString();
      res.status(400).json({
        Error,
        message: 'Bad Request',
      });
    });
};

// get all sub_Task
exports.getSubTask = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const data = await SubTask.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection
    const count = await SubTask.countDocuments();
    res.status(200).json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data,
      message: 'Success',
    });
  } catch (err) {
    const Error = err.toString();
    res.status(400).json({
      Error,
      message: 'Bad Request',
    });
  }
};

exports.subtaskUpdate = async (req, res) => {
  try {
    const subtask = await SubTask.findByIdAndUpdate({ '_id': req.params.id});
    subtask.subtask_description = req.body.subtask_description;
    const data = await subtask.save();
    res.status(200).json({
      data,
      message: 'Success',
    });
  } catch (err) {
    const Error = err.toString();
    res.status(400).json({
      Error,
      message: 'Bad Request',
    });
  }
};
