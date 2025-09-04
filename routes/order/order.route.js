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
      endPoint: '/add-order',
      method: 'POST',
      controllers: ['orderAddController'],
      description: 'Order insert or offer insert',
    },
    {
      endPoint: '/add-order-detail',
      method: 'POST',
      controllers: ['orderAddDetailController'],
      description: 'order detail insert or offer detail',
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
