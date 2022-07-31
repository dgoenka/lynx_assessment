'use strict';

const productService = require('../../services/ProductService');

exports.getOne = async ctx => {
  const { term } = ctx.params;
  const product = await productService.findOneProduct(term);
  ctx.assert(product, 404, "The requested product doesn't exist");
  ctx.status = 200;
  ctx.body = product;
};

exports.getMostViewed = async ctx => {
  const { count = 5 } = ctx.params;
  const products = await productService.getByPopularity(count);
  ctx.status = 200;
  ctx.body = products;
};
