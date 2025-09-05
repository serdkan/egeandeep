const orderRoute = {
  routePrefix: '/api/orders',
  routes: [
    {
      endPoint: '/order/list',
      method: 'GET',
      controllers: ['orderListController'],
      description: 'User fetches list',
    },
    {
      endPoint: '/offer/list',
      method: 'GET',
      controllers: ['orderOfferListController'],
      description: 'User fetches list',
    },
    {
      endPoint: '/order-detail-row/list/:Id',
      method: 'GET',
      controllers: ['orderListRowController'],
      description: 'User fetches list',
    },
    {
      endPoint: '/order-offer/list',
      method: 'GET',
      controllers: ['orderOfferListController'],
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
