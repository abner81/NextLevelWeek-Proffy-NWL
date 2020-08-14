import { Request, Response } from "express";
import bcrypt from 'bcryptjs'

import db from "../database/connection";

export default class LoginController {
  async index(req: Request, res: Response) {
    const { email, password, user_id } = req.body;

    try {
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

      const encriptPassword = bcrypt.hashSync(password, 8)

      const response = await db("login_user").insert({
        email: email,
        password: encriptPassword,
        user_id: user_id,
      });
      console.log(response);
      

      res.send(response);
    } catch (error) {
      res.status(error.status).send(error.message)
    }
  }

/*   async listUsers(req: Request, res: Response) {
    const { email, password } = req.body;

    const response = await db("login_user");

    res.send(response);
  } */
}
