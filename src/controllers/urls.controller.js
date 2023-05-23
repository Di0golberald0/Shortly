import { nanoid } from 'nanoid';
import { db } from '../database/database.js';

export async function shortenUrl(req, res) {
  const { id } = res.locals.user;
  const { url } = req.body;

  const shortUrl = nanoid(8);

  try {
    await db.query(
      `
    INSERT INTO shortens(url, "shortUrl", "userId")
    VALUES ($1, $2, $3)
  `,
      [url, shortUrl, id]
    );

    res.status(201).send({ shortUrl });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  };
};

export async function getUrlById(req, res) {
  const { id } = req.params;

  try {
    const result = await db.query(`SELECT * FROM shortens WHERE id = $1`, [id]);

    if (result.rowCount === 0) return res.sendStatus(404);

    const [url] = result.rows;

    delete url.views;
    delete url.userId;
    delete url.createdAt;

    res.send(url);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  };
};

export async function openShortUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const result = await db.query(
      `
    SELECT * 
    FROM shortens 
    WHERE "shortUrl" = $1`,
      [shortUrl]
    );
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    const [url] = result.rows;

    await db.query(
      `
    UPDATE shortens
    SET "views" = "views" + 1
    WHERE id = $1`,
      [url.id]
    );

    res.redirect(url.url);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  };
};

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const { user } = res.locals;

  try {
    const result = await db.query(`SELECT * FROM shortens WHERE id = $1`, [id]);

    if (result.rowCount === 0) return res.sendStatus(404);

    const [url] = result.rows;

    if (url.userId !== user.id) return res.sendStatus(401);

    await db.query("DELETE FROM shortens WHERE id=$1", [id]);

    res.sendStatus(204); 
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  };
};