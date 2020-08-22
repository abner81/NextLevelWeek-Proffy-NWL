import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import db from "../database/connection";

export default class CreateLoginInfo {
  async index(req: Request, res: Response) {
    const { email, password, user_id } = req.body;

    try {
      if (!email || !password || !user_id)
        res.status(409).send("Preencha os campos: email, password e user_id.");

      const userExists = await db("login_user")
        .where({
          email: email,
        })
        .select("email");

      if (userExists.length > 0) {
        res
          .status(409)
          .send("Email indisponível, tente novamente com outro email.");
      }

      const encriptPassword = bcrypt.hashSync(password, 8);

      await db("login_user").insert({
        email: email,
        password: encriptPassword,
        user_id: user_id,
      });

      res.send('Sucess');
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
}
