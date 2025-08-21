const jwt = require('jsonwebtoken');

async function userGetInfoController(req, res) {
  try {
    const token = req.headers.authorization;
    const secretKey = process.env.SECRET_KEY;
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missingss' });
    }
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Invalid user' });
    }
    return res.json(req.user);
  } catch (err) {
    throw new Error('Error fetching user information');
  }
}
module.exports = userGetInfoController;
