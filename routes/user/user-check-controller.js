const jwt = require('jsonwebtoken');

function userCheckController(req, res, next) {
  const token = req.cookies.rbsBearer;
  const secretKey = process.env.SECRET_KEY;
  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }
  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;
    return next(); // Next callback
  } catch (error) {
    return res.redirect('/');
  }
}

module.exports = userCheckController;
