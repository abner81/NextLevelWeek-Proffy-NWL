import { container } from 'tsyringe'
import { Request, Response } from "express";

import CreateUserModel from "../services/CreateUserService";


export default class CreateUser {
  async createUserMobile (req: Request, res: Response) {
    const { name } = req.body;
    const userModel = container.resolve(CreateUserModel);

    try {
      const response = await userModel.userMobileModel(name)

      res.status(response.status).send(response.message)
    } catch (error) {
      res.status(404).send(error)
    }
  }

  async createUserWeb (req: Request, res: Response) {
    const { name, email, password } = req.body;
    const userModel = container.resolve(CreateUserModel);
    try {
      const response = await userModel.userWebModel(name, email, password);

       res.status(response.status).send(response.message);
    } catch (error) {
      res.status(404).send(error);
    }
  }
}
