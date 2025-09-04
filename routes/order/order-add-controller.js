const Order = require('./model/orders.model');

async function orderAddController(req, res) {
  Order.addOrder(req, res, 'add-order');
}

module.exports = orderAddController;
