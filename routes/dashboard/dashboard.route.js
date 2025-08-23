const dashboarRoute = {
  routePrefix: '/api/dasboard',
  routes: [
    {
      endPoint: '/:module/list',
      method: 'GET',
      controllers: ['dashboardModuleController'],
      description: 'User fetches list',
    },
  ],
};

module.exports = dashboarRoute;
