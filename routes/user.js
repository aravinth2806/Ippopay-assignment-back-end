const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createUser,
  getUser,
  getUserById,
  userUpdate,
  deleteUserById,
  putUserById,
} = require('../controller/user');

router.post('/user', auth, createUser);

router.get('/user', auth, getUser);

router.get('/user/:id', auth, getUserById);

router.patch('/user/:id', auth, userUpdate);

router.delete('/user/:id', auth, deleteUserById);

router.put('/user/:id', auth, putUserById);

module.exports = router;
