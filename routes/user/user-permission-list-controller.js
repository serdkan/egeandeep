const sql = require('mssql');
const User = require('./model/user.model');

async function userPermissionListController(req, res) {
  try {
    const permission = await User.userInformation(
      {
        firmId: {
          type: sql.Int,
          value: 1,
        },
        userId: {
          type: sql.Int,
          value: 1,
        },
      },
      'user-login-role',
    );
    res.send(permission);
  } catch (err) {
    res.sendStatus(err);
  }
}

module.exports = userPermissionListController;
