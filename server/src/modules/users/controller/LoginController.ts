import { container } from "tsyringe";
import { Request, Response } from "express";

import LoginService from "@users/services/LoginService";

export default class CreateLoginInfo {
  async index(req: Request, res: Response) {
    const loginService = container.resolve(LoginService);
    const { email, password, user_id } = req.body;

    try {
      const response = await loginService.index(email, password, user_id);
      res.status(response.status).send(response.message);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
}
