const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 10,
      trim: true,
    },
    last_name: {
      type: String,
      default: 'null',
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email',
        isAsync: false,
      },
    },
    phone_number: {
      type: Number,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
      trim: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
      },
    ],
  },
  { timestamps: true }
);
UserSchema.methods.toJSON = function () {
  var passwordObject = this.toObject();
  delete passwordObject.password;
  return passwordObject;
};

module.exports = mongoose.model('user', UserSchema);
