const { executeQuery } = require('../../../libs/helper');
const {
  userLoginCheckSql,
  userParamsSql,
  userUserPermissionSql,
} = require('../user.sql');

class User {
  static async userInformation(params, type) {
    let sql = '';
    switch (type) {
      case 'user-login-check':
        sql = userLoginCheckSql;
        break;
      case 'get-firm-params':
        sql = userParamsSql;
        break;
      case 'user-login-role':
        sql = userUserPermissionSql;
        break;
      default:
        break;
    }

    const result = await executeQuery(sql, [params])
      .then((data) => data)
      .catch((err) => console.log(err));
    return result;
  }
}

module.exports = User;
