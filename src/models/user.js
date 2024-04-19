/* const db = require('../db/connection');
const encode = require('../utils/encode') */

import db from '../db/connection.js'
import encode from '../utils/encode.js'

const createUser = async (
  username,
  name,
  lastName,
  country,
  email,
  password
) => {
  const [rows] = await db.promise().query(
    `
    INSERT INTO users (username, nombre, apellido, pais, email, password, tipo_cuenta, created_at, last_modified) 
    VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `,
    [username, name, lastName, country, email, password, 'admin']
  )
  return rows.insertId
}

const getUserByUsername = async (username) => {
  const [rows] = await db
    .promise()
    .query(
      'SELECT id, username, nombre, apellido, pais, email FROM users WHERE username = ?',
      [username]
    );
  if (rows.length === 0) {
    return 'Este usuario no existe';
  }
  return rows[0];
};

const validateUser = async (username, password) => {
  const [rows] = await db
    .promise()
    .query('SELECT id, username, password FROM users WHERE username = ?', [
      username
    ])
  if (rows.length === 0) {
    return null // No existe
  }

  const storedPassword = rows[0].password
  const passMatches = await encode.compare(password, storedPassword)

  if (passMatches) {
    return true
  } else {
    return null // no coinciden
  }
}

export { createUser, getUserByUsername, validateUser }