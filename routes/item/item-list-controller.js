const sql = require('mssql');
const Item = require('./model/item.model');

async function itemListController(req, res) {
  try {
    const { type } = req.query;
    const result = await Item.getItem(
      {
        group: {
          type: sql.VarChar,
          value: type,
        },
      },
      'items',
      '',
    );

    return res.json(result);
  } catch (err) {
    return res.status(500).send('Server error occurred');
  }
}

module.exports = itemListController;
