import * as signRepository from '../repositories/signRepository.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(422).send('Todos os campos devem ser enviados corretamente');
  }

  if (password !== confirmPassword) {
    return res.status(422).send('Senhas devem ser iguais');
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    await signRepository.insertUser(
      name,
      email,
      passwordHash,
    );
    
    res.sendStatus(201);
  } catch (error) {
    return res.status(500).send('Erro no Servidor');
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(422).send('Todos os campos devem ser enviados corretamente');
  }

  try {
    const user = await signRepository.getUserByEmail(email);
  
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ user: user.rows[0].id }, process.env.TOKEN_SECRET);

      await signRepository.insertSessions({
        userId: user.rows[0].id,
        token,
      });
    
      res.status(200).send(token);
    } else {
      res.status(401).send("Erro no SignIn");
    } 
  } catch (error) {
    return res.status(500).send('Erro no Servidor');
  }
}