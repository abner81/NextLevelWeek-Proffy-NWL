import { Request, Response } from "express";

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
}
