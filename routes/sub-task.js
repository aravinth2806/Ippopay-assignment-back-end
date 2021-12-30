const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createSubTask,
  getSubTaskById,
  getSubTask,
  subtaskUpdate,
} = require('../controller/sub-task');

//post data using id for task
router.post('/subtask/:id', auth, createSubTask);

// get particular data(task) using id
router.get('/subtask/:id', auth, getSubTaskById);

router.get('/subtask/:id', auth, subtaskUpdate);
// get all task
router.get('/subtask', auth, getSubTask);

module.exports = router;
