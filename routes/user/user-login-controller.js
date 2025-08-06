const sql = require('mssql');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const dayjs = require('dayjs');
const User = require('./model/user.model');

async function userLoginController(req, res) {
  try {
    res.cookie('rbsBearer', '', {
      expires: new Date(),
      httpOnly: true,
    });
    const { userName, password } = req.body;
    dotenv.config();
    const [isUser] = await User.userInformation(
      {
        userName,
        password,
      },
      'user-login-check',
    );
    if (!isUser) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const [params] = await User.userInformation(
      {
        firmId: {
          type: sql.Int,
          value: isUser.firmId,
        },
      },
      'get-firm-params',
    );
    const userRole = await User.userInformation(
      {
        firmId: {
          type: sql.Int,
          value: isUser.firmId,
        },
        userId: {
          type: sql.Int,
          value: isUser.id,
        },
      },
      'user-login-role',
    );
    const user = {
      id: isUser.id,
      isTelegramActive:
        params?.ParamsName === 'telegram' && params?.active === 1 ? 1 : 0 || 0,
      username: isUser.userName,
      password: isUser.password,
      firmId: isUser.firmId,
      workplaceId: isUser.workplaceId,
      role: userRole,
      workplaceName: isUser.workplaceName,
      firmName: isUser.firmName,
      telegramtoken: process.env.TOKEN,
      channel: process.env.CHANNEL,
    };

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(user, secretKey, { expiresIn: '12h' });
    res.cookie('rbsBearer', token, {
      expires: dayjs().add(12, 'hours').add(5, 'seconds').toDate(),
      httpOnly: true,
      secure: false,
    });
    return res.json({
      cookie: token,
      expiresIn: '12h',
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return res.redirect('/');
  }
}

async function userLogOutController(req, res) {
  res.cookie('rbsBearer', '', {
    expires: new Date(),
    httpOnly: true,
  });
  return res.redirect('/dashboard');
}
module.exports = { userLoginController, userLogOutController };
