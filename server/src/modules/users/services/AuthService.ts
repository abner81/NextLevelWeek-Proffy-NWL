import IUserRepository from "@users/repositories/ICreateUserRepository";
import IHashProvider from '@users/providers/hashProvider/models/IHashProvider'
import ITokenProvider from "@users/providers/jwtProvider/models/ITokenProvider";

import * as dotenv from "dotenv";
dotenv.config();

import { inject, injectable } from "tsyringe";
import IEmailService from "@shared/infra/providers/email/models/IEmailService";

@injectable()
class AuthService {
  constructor(
    @inject("userRepository")
    private repository: IUserRepository,

    @inject("hashProvider")
    private bcryptEncripted: IHashProvider,

    @inject("tokenProvider")
    private token: ITokenProvider,

    @inject("emailProvider")
    private email: IEmailService
  ) {}

  async generateToken(email: string, password: string) {
    try {
      if (!email || !password)
        return { status: 404, message: "Email e senha são obrigatórios." };

      const user = await this.repository.login_userWhereEmail(email);

      if (!user || user.length <= 0)
        return { status: 401, message: "Usuário não encontrado" };

      const isValidPassword = await this.bcryptEncripted.compareHash(
        password,
        user[0].password
      );

      if (!isValidPassword) return { status: 401, message: "Senha inválida" };

      const token = this.token.jwtSign(user[0].id, "secret", "365d");

      const infoUser = await this.repository.login_userWhereJoinSelect(email);

      if (!infoUser)
        return {
          status: 404,
          message:
            "Ocorreu um erro ao buscar o usuário na nossa base de dados.",
        };

      return {
        user: infoUser[0],
        token,
      };
    } catch (error) {
      return { status: 404, message: error.message };
    }
  }

  async forgotPassword(email: string) {
    try {
      if (!email) return { status: 404, message: "Email obrigatório." };

      const user = await this.repository.login_userWhereEmail(email);

      if (!user || user.length <= 0)
        return { status: 400, message: "Usuário não encontrado" };

      const token = this.token.jwtSign(
        user[0].id,
        process.env.FORGOT_PASSWORD_TOKEN,
        "1h"
      );

      user[0].password = "";

      const sendEmailSucess = await this.email.sendEmail(
        email,
        "Administrador <1bc06c3f38-638a4b@inbox.mailtrap.io>",
        "Recuperação de senha",
        `O seu token de autenticação é: ${token}`
      );

      if (!sendEmailSucess)
        return {
          status: 400,
          message: "Erro ao enviar o email de recuperação",
        };

      return {
        status: 200,
        message: token,
      };
    } catch (error) {
      return { status: 404, message: error.message };
    }
  }

  async resetPassword(email: string, password: string, token: string) {
    try {
      if (!email || !password || !token)
        return {
          status: 404,
          message: "Email, senha e token são obrigatórios.",
        };

      const user = await this.repository.login_userWhereEmail(email);

      if (!user || user.length <= 0)
        return { status: 400, message: "Usuário não encontrado" };

      const data = this.token.jwtVerify(
        token,
        process.env.FORGOT_PASSWORD_TOKEN
      );

      if (!data) return { status: 401, message: "Token inválido!" };

      const encriptedPassword = await this.bcryptEncripted.hashSync(
        password,
        8
      );

      await this.repository.login_userUpdatePassword(email, encriptedPassword);

      return;
    } catch (error) {
      return { status: 404, message: "Ocorreu um erro ao recuperar sua senha" };
    }
  }
}

export default AuthService