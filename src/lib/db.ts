// src/lib/db.ts
// import mysql from 'mysql2/promise';

// Create a MySQL connection pool
// const db = mysql.createPool({
//  host: 'localhost',
//  user: 'apecVIPdev', // your database username
//  password: 'Z112345!', // your database password
//  database: 'apec-vip', // your database name
// });

// Export the pool
// export default db;

import mysql from 'mysql2/promise';

// Get the database URL from environment variables
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

// Create a MySQL connection pool using the DATABASE_URL
const db = mysql.createPool({
  uri: DATABASE_URL,
});

// Export the pool
export default db;
