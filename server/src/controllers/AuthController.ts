import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "../database/connection";

export default class AuthController {
  async index(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await db("login_user").where({ email });
      console.log(user);

      if (!user) res.status(401).send("Usuário não encontrado");

      const isValidPassword = await bcrypt.compare(password, user[0].password);

      if (!isValidPassword) res.status(401).send();

      const token = jwt.sign({ id: user[0].id }, "secret", {
        expiresIn: "1d",
      });

      user[0].password = "";

      return res.json({
        user,
        token,
      });
    } catch (error) {
      res.status(404).send(error);
    }
  }

  async respAuth(req: Request, res: Response) {
    res.send({userId: req.userId})
  }
}
