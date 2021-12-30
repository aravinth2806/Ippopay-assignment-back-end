const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
AdminSchema.methods.toJSON = function () {
  var passwordObject = this.toObject();
  delete passwordObject.password;
  return passwordObject;
};
module.exports = mongoose.model('admin', AdminSchema);
