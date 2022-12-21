import * as signRepository from '../repositories/signRepository.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function signup(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).send('Você precisa enviar os campos corretamente!');
  }

  if (password !== confirmPassword) {
    return badRequestResponse(res, 'As senhas devem ser iguais!');
  }

  try {
    await signRepository.insertUser({
      email,
      name,
      password,
    });

    return createdResponse(res);
  } catch (error) {
    return serverErrorResponse(res, error);
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  await db.collection('users').insertOne({
    name,
    email,
    password: passwordHash 
    })

  res.sendStatus(201);
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  const user = await db.collection('users').findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = uuid();

    await db.collection('sessions').insertOne({ token, userId: user._id });

    res.send(token);
  } else {
    res.status(401).send("Erro no SignIn");
  }
}