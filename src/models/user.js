const db = require('../db/connection');
const encode = require('../utils/encode')

const createUser = async (username, name, lastName, country, email, password) => {
  const [rows] = await db.promise().query('INSERT INTO users (username, name, last_name, country, email, password) VALUES (?, ?, ?, ?, ?, ? )', [username, name, lastName, country, email, password]);
  return rows.insertId;
};


const getUserByUsername = async (username) => {
  const [rows] = await db.promise().query('SELECT id, username, name, last_name, country, email FROM users WHERE username = ?', [username]);
  if (rows.length === 0){
    return "Este usuario no existe";
  }
  return rows[0];
};


const validateUser = async (username, password) => {
    const [rows] = await db.promise().query('SELECT id, username, password FROM users WHERE username = ?', [username]);
    if (rows.length === 0){
      return null; // No existe
    }
    
    const storedPassword = rows[0].password;
    const passMatches = await encode.compare(password, storedPassword);
 
    if(passMatches){
      return true;
    } else {
      return null; // no coinciden
    }
}



module.exports = { createUser, getUserByUsername, validateUser };