const sql = require('mssql');
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

    const params = await User.userInformation(
      {
        firmId: {
          type: sql.Int,
          value: 1,
        },
      },
      'get-firm-params',
    );
    const userRole = await User.userInformation(
      {
        firmId: {
          type: sql.Int,
          value: 1,
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
      rules: userRole,
      role: 'admin',
      workplaceName: isUser.workplaceName,
      firmName: isUser.firmName,
      telegramtoken: process.env.TOKEN,
      channel: process.env.CHANNEL,
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
