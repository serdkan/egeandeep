import mssql from 'mysql';

mssql.map.register(String, mssql.NVarChar(100));

let INSERT_BATCH = 120;

const setInsertBatch = (num = INSERT_BATCH) => {
  INSERT_BATCH = num;
};
/**
 *
 * @param {string} query
 * @param {{inputParams: Array<[string, any, any]>, pool: string, multiple?: boolean}} options
 * @returns {Promise<mssql.IRecordSet>} recordsets
 */
async function find(query, options = {}) {
  const { inputParams = [], pool = 'sqlPool', multiple = false } = options;

  let request = global[pool].request();
  inputParams.forEach((param) => {
    const [paramName, paramValue, paramType] = param;

    request =
      paramType !== undefined
        ? request.input(paramName, paramType, paramValue)
        : request.input(paramName, paramValue);
  });
  const results = await request.query(query);
  return multiple ? results.recordsets : results.recordset;
}

/**
 *
 * @param {string} query
 * @param {{inputParams: Array<[string, any, any]>, pool: string}} options
 * @returns {Promise<mssql.IRecordSet[0]>} record
 *
 */
async function findOne(query, options = {}) {
  const { inputParams = [], pool = 'sqlPool' } = options;

  let request = global[pool].request();
  inputParams.forEach((param) => {
    const [paramName, paramValue, paramType] = param;

    request =
      paramType !== undefined
        ? request.input(paramName, paramType, paramValue)
        : request.input(paramName, paramValue);
  });
  const results = await request.query(query);
  return results.recordset[0];
}

/**
 * @param {string} query
 * @param {{pool: string, transaction: mssql.Transaction, inputParams: Array<[string, any, any]>, outputParams: Array<[string, any, any]>}} options
 */

async function executeQuery(query, options = {}) {
  const {
    transaction,
    outputParams = [],
    inputParams = [],
    pool = 'sqlPool',
  } = options;

  let request = transaction ? transaction.request() : global[pool].request();

  inputParams.forEach((param) => {
    const [paramName, paramValue, paramType] = param;

    request =
      paramType !== undefined
        ? request.input(paramName, paramType, paramValue)
        : request.input(paramName, paramValue);
  });
  outputParams.forEach((param) => {
    const [paramName, paramType] = param;

    request = request.output(paramName, paramType);
  });

  return request.query(query);
}

/**
 * @param {string} procedureName
 * @param {{pool: string, transaction: mssql.Transaction, inputParams: Array<[string, any, any]>, outputParams: Array<[string, any, any]>}} options
 */

async function executeProcedure(procedureName, options = {}) {
  const {
    pool = 'sqlPool',
    inputParams = [],
    outputParams = [],
    transaction,
  } = options;

  let request = transaction ? transaction.request() : global[pool].request();

  inputParams.forEach((param) => {
    const [paramName, paramValue, paramType] = param;

    request =
      paramType !== undefined
        ? request.input(paramName, paramType, paramValue)
        : request.input(paramName, paramValue);
  });
  outputParams.forEach((param) => {
    const [paramName, paramType] = param;

    request = request.output(paramName, paramType);
  });

  return request.execute(procedureName);
}

/**
 *
 * @param {string} tableName
 * @param {Array.<{[column: string]: any}>| {[column: string]: any}} records
 * @param {{ inputParams?: Array<[string, any, any]>, output?: {statement: string, params: Array<[string, any, any]>}, scopeIdentityAs?: string, transaction?: mssql.Transaction, output?: {statement: string, params: any[][]}}} options
 * @returns
 */

/**
 *
 * @param {string} tableName
 * @param {{[column: string]: any} | {[column: string]: {literal: string, value: any, type: any}}} record
 * @param {string} where
 * @param {Array<[string, any, any]>} whereParams
 * @param {{pool: string, transaction: mssql.Transaction, literalTableName: string, join: string}} options
 */
async function update(tableName, record, where, whereParams, options = {}) {
  const { transaction, pool = 'sqlPool', literalTableName, join } = options;

  let request = transaction ? transaction.request() : global[pool].request();

  const query = `
    UPDATE ${literalTableName ? tableName : `[${tableName}]`} 
    SET
    ${Object.keys(record)
      .map((field, index) => {
        if (record[field]?.literal)
          return `[${field}] = ${record[field].literal}`;

        if (record[field]?.type) {
          request = request.input(
            field + index.toString(),
            record[field].type,
            record[field].value,
          );
        } else {
          request = request.input(field + index.toString(), record[field]);
        }

        return `[${field}] = @${field}${index}`;
      })
      .join(', ')}

      ${join || ''}
    WHERE ${where}
    `;

  whereParams.forEach((param) => {
    const [paramName, paramValue, paramType] = param;

    request =
      paramType !== undefined
        ? request.input(paramName, paramType, paramValue)
        : request.input(paramName, paramValue);
  });

  return request.query(query);
}

/**
 *
 * @param {string} query - Query containing count as total
 * @param {{inputParams: Array<[string, any, any]>, multiple: boolean, pool}} options - The options for counting
 * @returns {Promise<number> | Promise<Array<number>>} recordsets
 */
async function countRows(query, options = {}) {
  const { pool = 'sqlPool', multiple = false, inputParams = [] } = options;

  let request = global[pool].request();
  inputParams.forEach((param) => {
    const [paramName, paramValue, paramType] = param;

    request =
      paramType !== undefined
        ? request.input(paramName, paramType, paramValue)
        : request.input(paramName, paramValue);
  });
  const results = await request.query(query);
  return multiple
    ? results.recordsets.map((rec) => rec[0]?.total || 0)
    : results.recordset?.[0]?.total || 0;
}

/**
 *
 * @callback findInBatchesCallback
 * @param {Mongoose.Document[]} matches - The documents matched in the current iteration
 * @param {number} step - step The current step in the current iteration
 * @param {number} iteration - The number of iterations to be executed
 * @param {number} totalRows - Total Number of documents matched
 * @returns {boolean}
 */

/**
 *
 * @param {string} query The main query to run
 * @param {string} countQuery The count query to run to get iteration count
 * @param {string} orderBy The column to order by
 * @param {!findInBatchesCallback} callback
 * @param {{limit: number, stopAfter:number, structure: object, inputParams: Array<[string, any, any]>, pool: string}} options
 */
async function findInBatches(
  query,
  countQuery,
  orderBy,
  callback,
  options = {},
) {
  const { limit = 50, stopAfter, pool = 'sqlPool', inputParams = [] } = options;

  const totalRows = await countRows(countQuery, {
    inputParams,
    multiple: false,
    pool,
  });
  const iterations = Math.ceil(totalRows / limit);

  for (let x = 1; x <= iterations; x++) {
    const batchesQuery = `
      ${query}
      ORDER BY ${orderBy}
      OFFSET ${limit * (x - 1)} ROWS 
      FETCH NEXT ${limit} ROWS ONLY
    `;

    const matches = await find(batchesQuery, {
      inputParams,
      pool,
    });

    const continueLoop = await callback(matches, x, iterations, totalRows);
    if (continueLoop === false) break;
    if (stopAfter && x === stopAfter) break;
  }
}

/**
 *
 * @param {string} tableName The table name
 * @param {string} columnName The column name
 * @param {{pool?: string}} options The options
 */
async function dropColumnIfExists(tableName, columnName, options = {}) {
  await dropDefaultConstraint(tableName, columnName, options);

  return executeQuery(
    `
    DECLARE @TableName NVARCHAR(255) = '${tableName}'
    DECLARE @ColumnName NVARCHAR(255) = '${columnName}'
    DECLARE @ConstraintName NVARCHAR(255)
    
    DECLARE constraint_cursor CURSOR FOR
    SELECT CONSTRAINT_NAME
    FROM INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE
    WHERE TABLE_NAME = @TableName AND COLUMN_NAME = @ColumnName
    
    OPEN constraint_cursor
    FETCH NEXT FROM constraint_cursor INTO @ConstraintName
    
    WHILE @@FETCH_STATUS = 0
    BEGIN
        DECLARE @DropConstraintSQL NVARCHAR(MAX)
        SET @DropConstraintSQL = 'ALTER TABLE ' + @TableName + ' DROP CONSTRAINT ' + @ConstraintName
        EXEC sp_executesql @DropConstraintSQL
    
        FETCH NEXT FROM constraint_cursor INTO @ConstraintName
    END
    
    CLOSE constraint_cursor
    DEALLOCATE constraint_cursor
    
    -- Step 2: Drop the column
    DECLARE @DropColumnSQL NVARCHAR(MAX)
    SET @DropColumnSQL = 'ALTER TABLE ' + @TableName + ' DROP COLUMN ' + @ColumnName
    EXEC sp_executesql @DropColumnSQL
    `,
    options,
  ).catch((err) => {
    console.log(err);
  });
}

async function dropDefaultConstraint(tableName, columnName, options = {}) {
  const name = await findOne(`
  SELECT name 
  FROM sys.default_constraints 
  WHERE parent_object_id = OBJECT_ID('${tableName}') 
    AND parent_column_id = (
      SELECT column_id 
      FROM sys.columns 
      WHERE object_id = OBJECT_ID('${tableName}') AND name = '${columnName}'
  );
`).then((v) => v?.name);

  if (!name) return;
  await executeQuery(
    `ALTER TABLE ${tableName} DROP CONSTRAINT ${name};`,
    options,
  );
}

/**
 * @returns {mssql.Transaction} transaction
 */
function createTransaction(poolName = 'sqlPool') {
  return global[poolName].transaction();
}

export default {
  findOne,
  find,
  executeQuery,
  executeProcedure,
  createTransaction,
  update,
  findInBatches,
  countRows,
  dropColumnIfExists,
  dropDefaultConstraint,
  setInsertBatch,
};
