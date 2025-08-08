const sql = require('mssql');

const sqlConfig = require('../mssql-config');

const executeQuery = async (sqlScript, parameters = []) => {
  return new Promise((resolve, reject) => {
    sql
      .connect(sqlConfig)
      .then((pl) => {
        const request = pl.request();
        parameters.forEach((param) => {
          Object.keys(param).forEach((key) => {
            request.input(
              key,
              param[key]?.type || sql.VarChar,
              param[key]?.value || param[key],
            );
          });
        });
        return request.query(sqlScript);
      })
      .then((result) => {
        const totalCount = result?.rowsAffected;
        resolve({ data: result.recordsets[0], totalCount });
      })
      .catch((err) => reject(err))
      .finally(() => {
        sql.close();
      });
  });
};

const findOne = (tableName, parameters = []) => {
  return new Promise((resolve, reject) => {
    let paramsql = '';
    sql
      .connect(sqlConfig)
      .then((pl) => {
        const request = pl.request();
        parameters.forEach((param) => {
          Object.keys(param).forEach((key) => {
            request.input(
              key,
              param[key]?.type || sql.VarChar,
              param[key]?.value || param[key],
            );
            paramsql += ` and ${key}=@${key} `;
          });
        });
        return request.query(
          `select top 1 * from ${tableName}(nolock) where 1=1 ${paramsql}`,
        );
      })
      .then((result) => {
        resolve(result.recordset);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = { executeQuery, findOne };
