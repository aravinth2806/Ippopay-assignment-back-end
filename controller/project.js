const Project = require('../model/Project');
const User = require('../model/User');

exports.createProject = async (req, res) => {
  await Project.create(req.body)
    .then((projects) => {
      return User.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { projects: projects._id } },
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

exports.getProject = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const data = await Project.find({ deleted_at: null })
      .populate({
        path: 'tasks',
        model: 'task',
        populate: {
          path: 'sub_task',
          model: 'sub-task',
        },
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    // get total documents in the Posts collection
    const count = await Project.countDocuments();
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

// get particular data(Task) using id
exports.getProjectById = async (req, res) => {
  await Project.findById({ _id: req.params.id })
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
exports.updateProjectById = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate({ '_id': req.params.id});
   project.name = req.body.name;
   project.description = req.body.description;
    const project1 = await project.save();
    res.json(project1);
  } catch (err) {
    const Error = err.toString();
    console.log(err);
    res.status(400).json({
      Error,
      message: 'Bad Request',
    });
  }
};

// soft delete
exports.deleteProjectById = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate({ '_id': req.params.id });
    project.deleted_at = new Date();
    const project1 = await project.save();
    res.json(project1);
  } catch (err) {
    const Error = err.toString();
    res.status(400).json({
      Error,
      message: 'Bad Request',
    });
  }
};

exports.putProjectById = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate({ '_id': req.params.id });
    project.deleted_at = null;
    const project1 = await project.save();
    res.json(project1);
  } catch (err) {
    const Error = err.toString();
    res.status(400).json({
      Error,
      message: 'Bad Request',
    });
  }
};
