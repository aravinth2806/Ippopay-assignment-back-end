const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const AdminController = require('./routes/admin');
const UserController = require('./routes/user');
const ProjectController = require('./routes/project');
const TaskController = require('./routes/task');
const SubTaskController = require('./routes/sub-task');
const url = process.env.DB;
const con = mongoose.connection;
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const cors = require('cors');

const app = express();
mongoose.connect(url, { useNewUrlParser: true });

con.on('open', () => {
  console.log('connected... ');
});

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: '*',
  })
);

app.use('/api/admin', AdminController);

app.use('/api/admin', UserController);

app.use('/api/admin', ProjectController);

app.use('/api/admin', TaskController);

app.use('/api/admin', SubTaskController);

app.listen(port, '0.0.0.0', () => {
  console.log('server started..' + port);
});
