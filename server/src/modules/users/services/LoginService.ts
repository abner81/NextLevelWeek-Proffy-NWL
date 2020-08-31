import {inject, injectable} from 'tsyringe'

import ILoginService from "@users/models/ILoginService";
import IUserRepository from "@users/repositories/ICreateUserRepository";
import IHashProvider from '@users/providers/hashProvider/models/IHashProvider';

@injectable()
export default class LoginService implements ILoginService {
  constructor(
    @inject("userRepository")
    private repository: IUserRepository,

    @inject("hashProvider")
    private bcryptEncripted: IHashProvider
  ) {}

  async index(email: string, password: string, user_id: number) {
    try {
      if (!email || !password || !user_id)
        return {
          status: 409,
          message: "Preencha os campos: email, password e user_id.",
        };

      const userExists = await this.repository.login_userWhereEmailSelect(
        email
      );

      if (userExists.length > 0)
        return {
          status: 409,
          message: "Email indisponível, tente novamente com outro email.",
        };

      const encriptPassword = await this.bcryptEncripted.hashSync(password, 8);

      await this.repository.login_userFullInsert(email, encriptPassword, user_id);

      return { status: 200, message: "Sucess" };
    } catch (error) {
      return {status: 404, message: error.message}
    }
  }
}
