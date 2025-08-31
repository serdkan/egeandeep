const accountRoute = {
  routePrefix: '/api/account',
  routes: [
    {
      endPoint: '/list',
      method: 'GET',
      controllers: ['accountListController'],
      description: 'Account fetches list',
    },
  ],
};

module.exports = accountRoute;
