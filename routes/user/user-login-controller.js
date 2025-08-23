const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const dayjs = require('dayjs');
const User = require('./model/user.model');

async function userLoginController(req, res) {
  try {
    res.cookie('egeanBearer', '', {
      expires: new Date(),
      httpOnly: true,
    });
    const { userName, password } = req.body;
    dotenv.config();
    const userInformation = await User.userInformation(
      {
        userName,
        password,
      },
      'user-login-check',
    );

    const isUser = userInformation?.data?.[0];
    if (!isUser) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const user = {
      id: isUser.id,
      username: isUser.userName,
      role: 'admin',
    };

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(user, secretKey, { expiresIn: '12h' });
    res.cookie('egeanBearer', token, {
      expires: dayjs().add(12, 'hours').add(5, 'seconds').toDate(),
      httpOnly: true,
      secure: false,
    });
    return res.json({
      cookie: token,
      expiresIn: '12h',
      user,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return res.redirect('/');
  }
}

async function userLogOutController(req, res) {
  res.cookie('egeanBearer', '', {
    expires: new Date(),
    httpOnly: true,
  });
  return res.redirect('/dashboard');
}
module.exports = { userLoginController, userLogOutController };
