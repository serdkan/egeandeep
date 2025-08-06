const userRoute = require('./user/user.route');
const orderRoute = require('./order/order.route');
const dashboardRoute = require('./dashboard/dashboard.route');

const controllersConfig = [userRoute, orderRoute, dashboardRoute];
module.exports = controllersConfig;
