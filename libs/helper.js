const sql = require('mssql');

const sqlConfig = require('../mssql-config');

let pool;

const getPool = async () => {
  if (!pool) {
    pool = await sql.connect(sqlConfig);
  }
  return pool;
};

const insert = async (tableName, data, prefix) => {
  const defaultPrefix = prefix ?? process.env.DB;
  const pl = await getPool();
  const request = pl.request();

  const columns = Object.keys(data);
  const values = columns.map((col) => `@${col}`);

  columns.forEach((col) => {
    const value = data[col];
    request.input(col, value);
  });

  const sqlScript = `
    INSERT INTO ${defaultPrefix}.dbo.${tableName} (${columns.join(', ')})
    VALUES (${values.join(', ')});
    
    SELECT SCOPE_IDENTITY() AS InsertedId;
  `;

  const result = await request.query(sqlScript);
  return result.recordset[0]?.InsertedId || null;
};

const executeQuery = async (sqlScript, parameters = []) => {
  const pl = await getPool();
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

  const result = await request.query(sqlScript);
  const totalCount = result?.rowsAffected;

  return { data: result.recordsets[0], totalCount };
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

module.exports = { executeQuery, findOne, insert };
