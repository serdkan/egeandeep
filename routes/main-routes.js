const userRoute = require('./user/user.route');
const orderRoute = require('./order/order.route');
const dashboardRoute = require('./dashboard/dashboard.route');
const accountRoute = require('./account/accout.route');
const itemRoute = require('./item/item.route');

const controllersConfig = [
  userRoute,
  orderRoute,
  dashboardRoute,
  accountRoute,
  itemRoute,
];
module.exports = controllersConfig;
