import { connection } from '../../db/database.js';

async function upsertVisit(shortId) {
  const result = await getVisit(shortId);
  if (result.rowCount > 0) {
    return increaseVisit(shortId);
  }

  return insertVisit(shortId);
}

async function insertVisit(shortId) {
  return connection.query(
    `INSERT INTO visits ("shortid", visit) VALUES ($1, $2);`,
    [shortId, 1]
  );
}

async function increaseVisit(shortId) {
  return connection.query(
    `UPDATE visits SET visit = visit + 1 WHERE "shortid" = $1;`,
    [shortId]
  );
}

async function getVisit(shortId) {
  return connection.query(`SELECT * FROM visits WHERE "shortid" = $1;`, [
    shortId,
  ]);
}

export { getVisit, insertVisit, increaseVisit, upsertVisit };