import { connection } from '../../db/database.js';

async function insertUser(name, email, password) {
  return await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, password]);
}

async function getUserByEmail(email) {
  return await connection.query(`SELECT * FROM users WHERE email = $1;`, [email]);
}

async function getTokenByUserId(userId) {
  return await connection.query(`SELECT * FROM sessions WHERE "userId" = $1 AND active = TRUE;`, [userId]);
}

async function insertSessions(userId, token) {
  return await connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [userId, token]);
}

export { insertUser, getUserByEmail, insertSessions, getTokenByUserId };