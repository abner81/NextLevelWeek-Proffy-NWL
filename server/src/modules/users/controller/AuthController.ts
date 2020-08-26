import { container } from "tsyringe";

import { Request, Response } from "express";
import AuthService from "@users/services/AuthService";

export default class AuthController {

  async index(req: Request, res: Response) {
    const { email, password } = req.body;
     const authService = container.resolve(AuthService);

    try {
      const response = await authService.generateToken(email, password)

      res.send(response); 
    } catch (error) {
      res.status(404).send(error.message)
    }
  }

  async respAuth(req: Request, res: Response) {
    res.send({ id: req.userId });
  }

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    const authService = container.resolve(AuthService);

    try {
      await authService.forgotPassword(email)

      res.send()
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  async resetPassword(req: Request, res: Response) {
    const { email, password, token } = req.body
    const authService = container.resolve(AuthService);

    try {
     await authService.resetPassword(email, password, token);

      res.send()
    } catch (error) {
      res.status(404).send(error)
    }
  }
}
