const sql = require('mssql');

function buildSqlParams(params, types) {
  const result = {};

  for (const key in params) {
    let type = types[key] || sql.VarChar;

    [type] = type;

    let value = params[key];
    if (type === sql.Int) {
      value = Number(value);
    }

    result[key] = { type, value };
  }
  console.log(result);
  return result;
}

module.exports = buildSqlParams;
