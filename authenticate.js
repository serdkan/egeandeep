import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send('Forbidden');
    req.user = user;
    return next();
  });
  return res.status(401).json({ message: 'Authorization token missing' });
}
export default authenticateToken;
