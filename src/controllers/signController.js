import * as signRepository from '../repositories/signRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(422).send('Todos os campos devem ser enviados corretamente');
  }

  if (password !== confirmPassword) {
    return res.status(422).send('Senhas devem ser iguais');
  }

  const emailRegex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/

  if (!emailRegex.test(email)) {
    return res.status(422).send('Estrutura de email inválida');
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const isThereUser = await signRepository.getUserByEmail(email);
  
    if (isThereUser.rowCount !== 0) {
      return res.status(409).send('Usuário já cadastrado');
    }
    
    const result = await signRepository.insertUser(
      name,
      email,
      passwordHash,
    );

    res.sendStatus(201);
  } catch (error) {
    return res.status(500).send('Erro no Servidor signup');
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(422).send('Todos os campos devem ser enviados corretamente');
  }

  const emailRegex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/

  if (!emailRegex.test(email)) {
    return res.status(422).send('Estrutura de email inválida');
  }

  try {
    const user = await signRepository.getUserByEmail(email);

    if (user.rowCount !== 0 && bcrypt.compareSync(password, user.rows[0].password)) {
      
      const token = jwt.sign({ user: user.rows[0].id }, process.env.TOKEN_SECRET);
      
      await signRepository.insertSessions(user.rows[0].id, token);

      res.status(200).send(token);
    } else {
      res.status(401).send("Erro no SignIn");
    } 
  } catch (error) {
    return res.status(500).send('Erro no Servidor signin');
  }
}