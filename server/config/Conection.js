const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost', // Type here the host
  user: 'sofkadb_admin', // Type here the user
  password: '123456788', // Type here the pass
  database: 'pruebasofka',
  multipleStatements: true,
});

module.exports = { db };
