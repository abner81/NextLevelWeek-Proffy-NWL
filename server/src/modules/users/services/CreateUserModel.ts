import bcrypt from "bcryptjs";

import CreateUserRepository from "../repository/CreateUserRepository";
const repository = new CreateUserRepository()

export default class CreateUserModel {
  async userMobileModel(name: string) {
    try {
      if (!name)
        return {
          status: 404,
          message: "Insira corretamente o seu nome!",
        };

      const user = await repository.usersInsertName(name)
      
      return { status: user.status, message: { id: user.message } };
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

      const userExists = await repository.login_userWhereEmailSelect(email)

      if (userExists.length > 0)
        return {
          status: 409,
          message: "Email indisponível, tente novamente com outro email.",
        };

       const user = await repository.usersInsertName(name);

      const encriptPassword = bcrypt.hashSync(password, 8);

      const response = await repository.login_userFullInsert(
        email,
        encriptPassword,
        user.message as number
      );
      return {
        status: response.status,
        message: response.message
      };
    } catch (error) {
      return {
        status: 404,
        message: error,
      };
    }
  }
}
