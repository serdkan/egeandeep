const sql = require('mssql');
const Order = require('./model/orders.model');

async function orderListRowController(req, res) {
  try {
    const { Id } = req.params;
    const result = await Order.getOrder(
      {
        params: {
          Id: {
            type: sql.Int,
            value: Id,
          },
        },
      },
      { type: 'order-detail-row' },
    );
    return res.json(result);
  } catch (err) {
    return res.status(500).send('Server error occurred');
  }
}

module.exports = orderListRowController;
