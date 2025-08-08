const orderRoute = {
  routePrefix: '/api/orders',
  routes: [
    {
      endPoint: '/list',
      method: 'GET',
      controllers: ['orderListController'],
      description: 'User fetches list',
    },
    {
      endPoint: '/order-insert',
      method: 'POST',
      controllers: ['orderDeleteController'],
      description: 'User info',
    },
    {
      endPoint: '/order-update',
      method: 'UPDATE',
      controllers: ['orderUpdateController'],
      description: 'User info',
    },
  ],
};

module.exports = orderRoute;
