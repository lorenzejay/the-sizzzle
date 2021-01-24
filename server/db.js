const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Subarachnoidspace123",
  host: "localhost",
  port: 5432,
  database: "recipegram",
});

module.exports = pool;
