const userRoute = {
  routePrefix: '/api/user',
  routes: [
    {
      endPoint: '/list',
      method: 'GET',
      controllers: ['userListController'],
      description: 'User fetches list',
    },
    {
      endPoint: '/user-info-list-permission',
      method: 'GET',
      controllers: ['userPermissionListController'],
      description: 'User info',
    },
    {
      endPoint: '/user-update',
      method: 'POST',
      controllers: ['userUpdateController'],
      description: 'User update',
    },
    {
      endPoint: '/get-user-info',
      method: 'GET',
      controllers: ['userGetInfoController'],
      description: 'User info',
    },
  ],
};

module.exports = userRoute;
