import { connection } from '../../db/database.js';

async function insertUser(name, email, password) {
  const result = await connection.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
    [name, email, password]
  );

  return result;
}

async function getUserByEmail(email) {
  return connection.query(`SELECT * FROM users WHERE email = $1;`, [email]);
}

async function getTokenByUserId(userId) {
  return connection.query(
    `SELECT * FROM sessions WHERE "userId" = $1 AND active = TRUE;`,
    [userId]
  );
}

async function insertSessions(userId, token) {
  return connection.query(
    `INSERT INTO sessions ("userId", token) VALUES ($1, $2);`,
    [userId, token]
  );
}

export { insertUser, getUserByEmail, insertSessions, getTokenByUserId };