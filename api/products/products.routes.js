'use strict';

const controller = require('./products.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/products`,
  });

  router.get('/product/:term', controller.getOne);
  router.get('/most-popular', controller.getMostViewed);

  return router;
};
