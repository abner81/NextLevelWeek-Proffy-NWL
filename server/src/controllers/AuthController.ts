import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "../database/connection";

export default class AuthController {
  async index(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await db("login_user").where({ email });

      if (!user) res.status(401).send("Usuário não encontrado");

      const isValidPassword = await bcrypt.compare(password, user[0].password);

      if (!isValidPassword) res.status(401).send('Senha inválida');

      const token = jwt.sign({ id: user[0].id }, "secret", {
        expiresIn: "365d",
      });

      const infoUser = await db("login_user")
        .where({email})
        .join("users", "login_user.user_id", "=", "users.id")
        .select("users.*", "login_user.email");

      return res.send({
        user: infoUser[0],
        token,
      });
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  async respAuth(req: Request, res: Response) {
    res.send({id: req.userId})
  }
}
