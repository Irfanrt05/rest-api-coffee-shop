const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "coffee_shop_db",
  password: "Irfanrt05",
  port: 5432,
});

module.exports = pool;
