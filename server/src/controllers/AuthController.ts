import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mailer from "../module/mailer";

import db from "../database/connection";

export default class AuthController {
  async index(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await db("login_user").where({ email });

      if (!user) res.status(401).send("Usuário não encontrado");

      const isValidPassword = await bcrypt.compare(password, user[0].password);

      if (!isValidPassword) res.status(401).send("Senha inválida");

      const token = jwt.sign({ id: user[0].id }, "secret", {
        expiresIn: "365d",
      });

      const infoUser = await db("login_user")
        .where({ email })
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
    res.send({ id: req.userId });
  }

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    try {
      const user = await db("login_user").where({ email });

      if (!user) res.status(400).send({ error: "Usuário não encontrado" });

      const token = jwt.sign(
        { id: user[0].id },
        process.env.FORGOT_PASSWORD_TOKEN,
        {
          expiresIn: "1h",
        }
      );

      user[0].password = "";

      const sendEmailSucess = await mailer.sendMail({
        to: email,
        from: "Administrador <1bc06c3f38-638a4b@inbox.mailtrap.io>",
        subject: "Recuperação de senha",
        text: `O seu token de autenticação é: ${token}`,
      });

      if (!sendEmailSucess)
        res.status(400).send("Erro ao enviar o email de recuperação");

      res.send();
    } catch (error) {
      res.status(404).send(error);
    }
  }

  async resetPassword(req: Request, res: Response) {
    const { email, password, token } = req.body

    try {
      const user = await db("login_user").where({ email });

      if (!user) res.status(400).send({ error: "Usuário não encontrado" });

      const data = jwt.verify(token, process.env.FORGOT_PASSWORD_TOKEN);

      if (!data) res.status(401).send("Token inválido!");

      const encriptedPassword = bcrypt.hashSync(password, 8);

      await db("login_user").where({ email }).update({
        password: encriptedPassword,
      });

      res.send()
    } catch (error) {
      res.status(404).send(error)
    }
  }
}
