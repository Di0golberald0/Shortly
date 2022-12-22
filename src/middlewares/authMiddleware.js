import jwt from 'jsonwebtoken';
import * as signRepository from '../repositories/signRepository.js';

export async function authMiddleware(req, res, next) {
  let token = req.headers?.authorization;
  token = token.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await signRepository.getTokenByUserId(decoded.user);

    if (user.rowCount > 0) {
      console.log(user.rowCount);
      res.locals.user = user.rows[0];
      return next();
    }
    return res.status(500).send('Erro na Autentificação');
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}