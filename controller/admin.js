const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin');
const dotenv = require('dotenv');
dotenv.config();

//get all admins
exports.getAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.send('Error: Invalid Credentials' + err);
  }
};

//post new data for admins
exports.createAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({
      email,
    });
    if (!admin)
      return res.status(400).json({
        Error: 'Invalid Email',
      });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({
        Error: 'Invalid Password',
      });

    const payload = {
      admin: {
        id: admin.id,
        email: admin.email,
        password: admin.password,
      },
    };

    jwt.sign(
      payload,
      process.env.TOKEN_SECREAT_KEY,
      {
        expiresIn: '1d',
      },
      (err, token) => {
        if (err) throw err;

        res.status(200).json({
          admin,
          token,
          message: 'Login Success',
        });
      }
    );
  } catch (err) {
    console.error(err);
    const Error = err.toString();
    res.status(500).json(
      {
        Error,
        message:'Bad Request'
      },
    );
  }
};

// //test
// router.get('/test', async (req, res) => {
//   try {
//     const password = await bcrypt.hash('123456', process.env.SECREAT_KEY);
//     res.json(password);
//   } catch (err) {
//     res.send('' + err);
//   }
// });

// router.post('/test', async (req, res) => {
//   const admin = new Admin({
//     email: req.body.email,
//     password: req.body.password,
//   });
//   try {
//     await admin.save();
//     res.json(admin);
//     res.status(200).json({
//       msg: 'Login Success',
//     });
//   } catch (err) {
//     res.send('' + err);
//   }
// });
