const Order = require('./model/orders.model');

async function orderListController(req, res) {
  try {
    const { skip, take } = req.query;
    const result = await Order.getOrder({}, 'order', { skip, take });
    return res.json({
      data: result.data,
      totalCount: result.totalCount,
    });
  } catch (err) {
    return res.status(500).send('Server error occurred');
  }
}

module.exports = orderListController;
