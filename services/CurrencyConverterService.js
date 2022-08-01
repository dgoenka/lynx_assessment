const fetch = require('node-fetch');

module.exports.convertCurrency = async (amount, toCurrency) => {
  const myHeaders = new fetch.Headers();
  myHeaders.append('apikey', 'YoWPdv1TYvDUTxIbBEbLnkvfhECkn7nx');

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  let response = await (await fetch(
    `https://api.apilayer.com/currency_data/convert?to=${toCurrency}&from=USD&amount=${amount}`,
    requestOptions,
  )).json();

  return Math.round(response.result * 100) / 100;
};
