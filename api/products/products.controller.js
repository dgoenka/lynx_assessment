'use strict';

const productService = require('../../services/ProductService');
const currencyConverterService = require('../../services/CurrencyConverterService');

exports.getOne = async ctx => {
  const { term } = ctx.params;
  const { currency } = ctx.query;

  const product = await productService.findOneProduct(term);
  if (currency && currency.toLowerCase() !== 'usd') {
    product.price = await currencyConverterService.convertCurrency(
      product.price,
      currency,
    );
  }
  ctx.status = 200;
  ctx.body = product;
};

exports.getMostViewed = async ctx => {
  const { count = 5, currency } = ctx.request.query;
  const products = await productService.getByPopularity(count);
  if (currency && currency.toLowerCase() !== 'usd') {
    await Promise.all(
      products.map(
        async product =>
          (product.price = await currencyConverterService.convertCurrency(
            product.price,
            currency,
          )),
      ),
    );
  }
  ctx.status = 200;
  ctx.body = products;
};
