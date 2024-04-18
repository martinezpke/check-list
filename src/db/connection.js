import mysql from 'mysql2'
import { env } from '../config/env';

console.log(env.DB_HOST)

const connection = mysql.createConnection({
  host: env.DB_HOST,
  user: env.DB_USER,
  port: env.DB_PORT,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  insecureAuth: true,
});

module.exports = connection;