import { nanoid } from 'nanoid';
import * as shortenRepository from '../repositories/shortenRepository.js';

async function shorten(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send('Url necessária');
  }

  try {
    const shortUrl = nanoid(10);

    shortenRepository.insertShortenUrl({
      url,
      shortUrl,
      userId: res.locals.user.id,
    });

    return res.status(200).send(shortUrl);
  } catch (error) {
    return res.status(500).send('Erro no Servidor shorten');
  }
}

async function open(req, res) {
  const { shortUrl } = req.params;

  try {
    const url = await shortenRepository.getUrl(shortUrl);

    return res.redirect(url.rows[0].url);
  } catch (error) {
    return res.status(500).send('Erro no Servidor open');
  }
}

export { shorten, open };