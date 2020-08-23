import { Request, Response } from "express";
import bcrypt from 'bcryptjs'

import db from "../database/connection";

export default class CreateUser {
  async index(req: Request, res: Response) {
    const { name } = req.body;

    try {
      if (!name)
        res.status(404).send('Insira corretamente o seu nome!');

      const user = await db('users').insert({
        name: name
      })

      res.send({id: user[0]})
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      if (!name)
        res.status(404).send('Insira corretamente o seu nome!');

      const user = await db('users').insert({
        name: name
      })

      //res.send({id: })

      if (!email || !password)
        res.status(409).send("Preencha os campos: email e password.");

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
        user_id: user[0],
      });

      res.send();
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
}
