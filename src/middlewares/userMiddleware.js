import userSchema from "../schemas/userSchema.js";

export function userMiddleware(req, res, next) {
  const user = req.body;

  const validation = userSchema.validate(user);
  if (validation.error) {
    return res.status(422).send("Erro na Validação");
  }

  next();
}