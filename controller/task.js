const Project = require('../model/Project');
const Task = require('../model/Task');
const User = require('../model/User');

//post data using id for task
exports.createTask = async (req, res) => {
  let user = await User.find({
    _id: req.body.assigned_to,
  });
  if (user.length > 0 || user === 0) {
    console.log('User is OK!!');
    await Task.create(req.body)
      .then((tasks) => {
        return Project.findByIdAndUpdate(
          { _id: req.params.id },
          { $push: { tasks: tasks._id } },
          { new: true }
        );
      })
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
  }
  // else if (user === 0) {
  //   console.log('User is OK!!');
  //   await Task.create(req.body)
  //     .then((task) => {
  //       return Project.findByIdAndUpdate(
  //         { _id: req.params.id },
  //         { $push: { task: task._id } },
  //         { new: true }
  //       );
  //     })
  //     .then((Project) => {
  //       res.json(Project);
  //     })
  //     .catch((err) => {
  //       res.json(err);
  //     });
  // }
  else {
    return res.status(400).json({
      Error: 'User not Exist',
    });
  }
};

// get particular data(task) using id
exports.getTaskById = async (req, res) => {
  await Task.findById(req.params.id)
    .populate('sub_tasks')
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

// get all task
exports.getTask = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const data = await Task.find()
      .populate('sub_tasks')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    // get total documents in the Posts collection
    const count = await Task.countDocuments();

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

exports.taskUpdate = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate({ '_id': req.params.id});
    task.task_description = req.body.task_description;
    const data = await task.save();
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