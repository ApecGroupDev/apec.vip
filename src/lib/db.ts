// src/lib/db.ts
import mysql from 'mysql2/promise';

// Create a MySQL connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'apecVIPdev', // your database username
  password: 'Z112345!', // your database password
  database: 'apec-vip', // your database name
});

// Export the pool
export default db;
