const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createTask,
  getTaskById,
  getTask,
  taskUpdate,
} = require('../controller/task');

//post data using id for task
router.post('/task/:id', auth, createTask);

// get particular data(task) using id
router.get('/task/:id', auth, getTaskById);

// get all task
router.get('/task', auth, getTask);

router.patch('/task/:id', auth, taskUpdate);

module.exports = router;
