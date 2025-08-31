const mssql = require('mssql');
const { accountListSql } = require('../account.sql.js');
const { executeQuery } = require('../../../libs/helper');

class Account {
  static async getAccount(params, type, customQuery) {
    let sql = '';
    switch (type) {
      case 'account':
        sql = accountListSql;
        break;
      default:
        break;
    }
    let paginationQuery = '';
    let paginationParams = {};
    if (customQuery) {
      paginationQuery =
        ' ORDER BY id OFFSET @Skip ROWS FETCH NEXT @Take ROWS ONLY';

      paginationParams = {
        skip: {
          type: mssql.Int,
          value: customQuery.skip,
        },
        take: {
          type: mssql.Int,
          value: customQuery.take,
        },
      };
    }

    const mergedParams = { ...params, ...paginationParams };

    const result = await executeQuery(`${sql}${paginationQuery}`, [
      mergedParams,
    ])
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
    return result;
  }
}

module.exports = Account;
