const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAdmin, createAdmin } = require('../controller/admin');

//get all admins
router.get('/admins', auth, getAdmin);

//post new data for admins
router.post('/login', createAdmin);

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

module.exports = router;
