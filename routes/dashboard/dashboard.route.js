const dashboarRoute = {
  routePrefix: '/api/dasboard',
  routes: [
    {
      endPoint: '/list/:module',
      method: 'GET',
      controllers: ['getModuleList'],
      description: 'User fetches list',
    },
  ],
};

module.exports = dashboarRoute;
