import { injectable, inject } from 'tsyringe'

import IUserRepository from "../repositories/ICreateUserRepository";

import EncriptedHash from "@shared/infra/encriptedHelper/EncriptedHash";
const bcryptHash = new EncriptedHash();

@injectable()
class UserModel {
  constructor(
    @inject("userRepository")
    private repository: IUserRepository
  ) {}

  async userMobileModel(name: string) {
    try {
      if (!name)
        return {
          status: 404,
          message: "Insira corretamente o seu nome!",
        };

      const user = await this.repository.usersInsertName(name);

      if (user.status === 404)
        return { status: user.status, message: user.message };

      return {
        status: user.status,
        message: { id: user.message },
      };
    } catch (error) {
      return { status: 404, message: error };
    }
  }

  async userWebModel(name: string, email: string, password: string) {
    try {
      if (!name || !email || !password)
        return {
          status: 409,
          message: "Preencha os campos: nome, email e password.",
        };

      const userExists = await this.repository.login_userWhereEmailSelect(
        email
      );

      if (userExists.length > 0)
        return {
          status: 409,
          message: "Email indisponível, tente novamente com outro email.",
        };

      const user = await this.repository.usersInsertName(name);

      const encriptPassword = await bcryptHash.hashSync(password, 8)

      const response = await this.repository.login_userFullInsert(
        email,
        encriptPassword,
        user.message as number
      );
      return {
        status: response.status,
        message: response.message,
      };
    } catch (error) {
      return {
        status: 404,
        message: error,
      };
    }
  }
}

export default UserModel
