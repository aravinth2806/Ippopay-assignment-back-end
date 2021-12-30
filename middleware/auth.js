const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// module.exports = (req, res, next) => {
//   const token = req.header('token');
//   if (!token) return res.status(401).json({ message: 'Auth Error' });

//   try {
//     jwt.verify(token, process.env.TOKEN_SECREAT_KEY, (err, admin) => {
//       if (err) return res.status(403).send('Errorr' + err);
//       req.admin = admin;
//       next();
//     });
//   } catch (e) {
//     console.error(e);
//     res.status(500).send({ message: 'Invalid Token' });
//   }
// };

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECREAT_KEY, (err, admin) => {
      if (err) {
        return res.status(403).send({Error: 'Token Invalid'});
      }

      req.admin = admin;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
