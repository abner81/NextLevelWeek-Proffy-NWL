import { Request, Response } from "express";

import CreateUserModel from "../models/CreateUserModel";
const userModel = new CreateUserModel()

export default class CreateUser {
  async createUserMobile (req: Request, res: Response) {
    const { name } = req.body;

    try {
      const response = await userModel.userMobileModel(name)

      res.status(response.status).send(response.message)
    } catch (error) {
      res.status(404).send(error)
    }
  }

  async createUserWeb (req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      const response = await userModel.userWebModel(name, email, password);

       res.status(response.status).send(response.message);
    } catch (error) {
      res.status(404).send(error);
    }
  }
}
