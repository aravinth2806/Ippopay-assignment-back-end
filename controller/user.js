const User = require('../model/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    password,
    address,
    gender,
    date_of_birth,
  } = req.body;

  try {
    user = new User({
      first_name,
      last_name,
      email,
      phone_number,
      password,
      address,
      gender,
      date_of_birth,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    const data = await user.save();

    res.status(201).json({
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

exports.getUser = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const data = await User.find({ deleted_at: null })
      .populate({
        path: 'projects',
        model: 'project',
        populate: {
          path: 'tasks',
          model: 'task',
          populate: {
            path: 'sub_task',
            model: 'sub-task',
          },
        },
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    // get total documents in the Posts collection
    const count = await User.countDocuments();
    // res.json(users);
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

exports.getUserById = async (req, res) => {
  try {
    const data = await User.findById(req.params.id).populate({
      path: 'projects',
      model: 'project',
      populate: {
        path: 'tasks',
        model: 'task',
        populate: {
          path: 'sub_tasks',
          model: 'sub-task',
        },
      },
    });
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

exports.userUpdate = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({ '_id': req.params.id});
    user.phone_number = req.body.phone_number;
    const data = await user.save();
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

// soft delete
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ id: req.params.id });
    user.deleted_at = new Date();
    const user1 = await user.save();
    res.json(user1);
  } catch (err) {
    const Error = err.toString();
    res.status(400).json({
      Error,
      message: 'Bad Request',
    });
  }
};

exports.putUserById = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ id: req.params.id });
    user.deleted_at = null;
    const user1 = await user.save();
    res.json(user1);
  } catch (err) {
    const Error = err.toString();
    res.status(400).json({
      Error,
      message: 'Bad Request',
    });
  }
};
