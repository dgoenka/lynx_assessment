const config = require('../config/components/database.config');
const util = require('util');
const mysql = require('mysql');

const con = mysql.createConnection({
  host: config.databaseConfig.host,
  user: config.databaseConfig.user,
  password: config.databaseConfig.password,
  port: config.databaseConfig.port,
  database: config.databaseConfig.database,
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
});
const query = util.promisify(con.query).bind(con);

module.exports.findOneProduct = async param => {
  const queryStr = `SELECT * FROM product where id=${param}`;
  const res = await query(queryStr);
  return res[0];
};

module.exports.getByPopularity = async count => {
  const queryStr = `SELECT * FROM product ORDER BY productViewed DESC LIMIT ${count} `;
  const res = await query(queryStr);
  return res;
};
