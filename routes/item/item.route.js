const itemRoute = {
  routePrefix: '/api/item',
  routes: [
    {
      endPoint: '/list',
      method: 'GET',
      controllers: ['itemListController'],
      description: 'Item fetches list',
    },
  ],
};

module.exports = itemRoute;
