const sql = require('mssql');
const Order = require('./model/orders.model');

async function orderListController(req, res) {
  try {
    const { startDate, endDate, type, orderType } = req.query;
    const result = await Order.getOrder(
      {
        startDate: {
          type: sql.Date,
          value: startDate,
        },
        endDate: {
          type: sql.Date,
          value: endDate,
        },
      },
      type,
      orderType.join(','),
    );
    return res.json({
      data: result.data,
      totalCount: result.totalCount,
    });
  } catch (err) {
    return res.status(500).send('Server error occurred');
  }
}

module.exports = orderListController;
