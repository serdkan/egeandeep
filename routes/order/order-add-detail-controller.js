const Order = require('./model/orders.model');

async function orderAddDetailController(req, res) {
  Order.addOrder(req, res, 'add-order-detail');
}

module.exports = orderAddDetailController;
