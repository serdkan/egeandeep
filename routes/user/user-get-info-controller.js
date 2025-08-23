const jwt = require('jsonwebtoken');
const sql = require('mssql');
const User = require('./model/user.model');

async function userGetInfoController(req, res) {
  try {
    const token = req.headers.authorization;
    const secretKey = process.env.SECRET_KEY;
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missingss' });
    }
    const decodedToken = jwt.verify(token, secretKey);
    if (!decodedToken.id) {
      return res.status(401).json({ message: 'Invalid user' });
    }
    const userRole = await User.userInformation(
      {
        firmId: {
          type: sql.Int,
          value: 1,
        },
        userId: {
          type: sql.Int,
          value: decodedToken.id,
        },
      },
      'user-login-role',
    );
    return res.json({ ...decodedToken, rules: userRole });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Server error', error: err.message });
  }
}
module.exports = userGetInfoController;
