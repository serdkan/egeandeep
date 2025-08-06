const express = require('express');

const router = express.Router();

const mainRoutes = require('./main-routes');
const mainController = require('./main-control');

mainRoutes.map((route) => {
  return route.routes.map((item) =>
    item.controllers.forEach((controller) => {
      if (controller) {
        mainController.forEach((control) => {
          if (control?.name === controller) {
            switch (item.method) {
              case 'GET':
                router.get(`${route.routePrefix}${item.endPoint}`, control);
                break;
              case 'POST':
                router.post(`${route.routePrefix}${item.endPoint}`, control);
                break;
              case 'UPDATE':
                router.put(`${route.routePrefix}${item.endPoint}`, control);
                break;
              case 'DELETE':
                router.delete(`${route.routePrefix}${item.endPoint}`, control);
                break;
              default:
                break;
            }
          }
        });
      }
    }),
  );
});
module.exports = router;
