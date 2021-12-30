const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createProject, getProject,getProjectById,updateProjectById, deleteProjectById, putProjectById } = require('../controller/project');

router.post('/project/:id', auth, createProject);

router.get('/project', auth, getProject);

router.get('/project/:id', auth, getProjectById);

router.patch('/project/:id', auth, updateProjectById);

router.delete('/project/:id', auth, deleteProjectById);

router.put('/project/:id', auth, putProjectById);
module.exports = router;
