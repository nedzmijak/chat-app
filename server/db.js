const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',         
  host: 'localhost',
  database: 'chatdb',
  password: 'postgres', 
  port: 5432,
});

module.exports = pool;
